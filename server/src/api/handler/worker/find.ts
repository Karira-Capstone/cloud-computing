import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { db } from '../../../prisma';

export const findWorkerHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const id = Number(request.params.workerId);
    const worker = await db.worker.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        reviews: true,
        services: {
          where: {
            type: 'APPROVED',
          },
        },
        skills: true,
      },
    });
    if (!worker) {
      throw Boom.notFound('Worker not found');
    }
    return worker;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('Cannot Find Worker');
  }
};
