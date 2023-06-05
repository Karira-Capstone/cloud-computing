import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { db } from '../../../prisma';

export const findServiceHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const serviceId = Number(request.params.serviceId);
    const service = await db.service.findUnique({
      where: {
        id: serviceId,
      },
      include: {
        category: true,
        reviews: true,
        skills: true,
        worker: {
          include: {
            user: true,
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
