import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { db } from '../../../../prisma';
import crypto from 'crypto';
import { notificationOnPaymentAccepted, notificationOnPaymentFailed } from '../../../../lib/messaging/notification';

export const callbackOrder = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const data = request.payload as any;
    console.log(data);
    if (!data) {
      return 'ok';
    }
    if (!verify(request.payload)) {
      throw Boom.badRequest('unauthenticated request');
    }
    const transaction_status = data.transaction_status;
    if (['capture', 'settlement'].includes(transaction_status)) {
      await onSuccess(data);
    } else if (['deny', 'cancel', 'expire', 'failure'].includes(transaction_status)) {
      await onFailure(data);
    }
    return 'ok';
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('');
  }
};

const verify = (obj: any) => {
  const { order_id, status_code, gross_amount } = obj;
  const hash = crypto
    .createHash('sha512')
    .update(order_id + status_code + gross_amount + process.env.SERVER_KEY)
    .digest('hex');
  return hash.toString() === obj.signature_key;
};

const onSuccess = async (data: any) => {
  const order_ = data.order_id;
  const order_id = order_.split('-')[1];
  const order = await db.order.update({
    where: {
      id: Number(order_id),
    },
    data: {
      status: 'PAID',
    },
  });
  await notificationOnPaymentAccepted(order_id);
};
const onFailure = async (data: any) => {
  const order_ = data.order_id;
  const order_id = order_.split('-')[1];
  const order = await db.order.update({
    where: {
      id: Number(order_id),
    },
    data: {
      status: 'CANCELLED',
    },
  });
  await notificationOnPaymentFailed(order_id);
};
