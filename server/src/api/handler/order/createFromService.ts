import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Client, User } from '@prisma/client';
import { db } from '../../../prisma';
import { notificationOnOrderFromService } from '../../../lib/messaging/notification';
import midtransSnap from '../../../lib/midtrans';

export const createOrderFromServiceHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      client: Client;
    };
    const serviceId = Number(request.params.serviceId);
    const service = await db.service
      .findFirstOrThrow({
        where: {
          id: serviceId,
          type: 'APPROVED',
        },
      })
      .catch(() => {
        throw Boom.notFound(`No approved service with id ${serviceId}`);
      });
    const payload = request.payload as any;
    const order = await db.order.create({
      data: {
        attachment: payload?.attachment || undefined,
        description: payload.description,
        price: service.price,
        status: 'ACCEPTED',
        type: 'SERVICE',
        service: {
          connect: {
            id: service.id,
          },
        },
        worker: {
          connect: {
            id: service.worker_id,
          },
        },
        client: {
          connect: {
            id: user.client.id,
          },
        },
      },
      include: {
        worker: {
          include: {
            user: true,
          },
        },
        client: {
          include: {
            user: true,
          },
        },
      },
    });
    await notificationOnOrderFromService(order.id)
    let parameter = {
      transaction_details: {
        order_id: `${new Date().getTime()}-${order.id}`,
        gross_amount: order.price,
      },
      customer_details: {
        first_name: order.client.user.full_name,
        last_name: '',
        email: order.client.user.email,
        phone: order.client.phone,
      },
    };
    const transaction = await midtransSnap.createTransaction(parameter);
    const finalOrder = await db.order.update({
      where: {
        id: order.id,
      },
      data: {
        midtrans_redirect_uri: transaction.redirect_url,
        midtrans_token: transaction.token,
      },
    });
    return finalOrder;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
