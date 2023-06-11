import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { db } from '../../../prisma';

export const searchServiceHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const title = request.query.q;
    const services = await db.service.findMany({
      where: {
        title: {
          contains: title,
        },
        type: {
          in: ['APPROVED'],
        },
      },
      include: {
        worker: {
          include: {
            user: true,
          },
        },
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
