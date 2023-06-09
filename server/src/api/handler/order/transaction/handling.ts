import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { db } from '../../../../prisma';
import { Client, User, Worker } from '@prisma/client';
import crypto from 'crypto';

export const callbackOrder = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    console.log('1');
    console.log(request.url.href);
    console.log(request.payload);
    if (!request.payload) {
      return 'ok';
    }
    if (!verify(request.payload)) {
      throw Boom.badRequest('');
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
