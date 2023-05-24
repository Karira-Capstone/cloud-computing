import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { SERVICE_STATUS, User, Worker } from '@prisma/client';
import { db } from '../../prisma';

export const createServiceHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      worker: Worker;
    };
    const payload = request.payload as any;
    const service = await db.service.create({
      data: {
        title: payload.title,
        description: payload.description,
        images: payload.images, // JSON
        type: SERVICE_STATUS.ONREVIEW,
        price: payload.price,
        worker: {
          connect: {
            id: user.worker.id,
          },
        },
        category: {
          connect: {
            id: payload.category.id,
          },
        },
      },
    });
    return service;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
