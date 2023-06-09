import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { db } from '../../../../prisma';
import { Client, User, Worker } from '@prisma/client';
import { notificationOnOrderCancelled } from '../../../../lib/messaging/notification';


export const callbackFailed = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    console.error("Failed")
    console.error(request.payload)
    return 'FAILED'
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('');
  }
};