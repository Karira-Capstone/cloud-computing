import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { User, Worker } from '@prisma/client';
import { db } from '../../../prisma';
import Boom from '@hapi/boom';

export const getYourOwnServicesHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      worker: Worker;
    };
    const services = await db.service.findMany({
      where: {
        worker_id: user.worker.id,
      },
      include: {
        orders: true,
        category: true,
        reviews: true,
      },
    });
    return services;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
