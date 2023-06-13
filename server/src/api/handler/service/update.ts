import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { User, Worker } from '@prisma/client';
import { db } from '../../../prisma';

export const updateServiceHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      worker: Worker;
    };
    const serviceId = Number(request.params.serviceId);
    await db.service.findFirstOrThrow({
      where: {
        id: serviceId,
        worker_id: user.worker.id,
      },
    });

    const payload = request.payload as any;
    const updatedService = await db.service.update({
      data: {
        title: payload.title || undefined,
        description: payload.description || undefined,
        images: payload.images || undefined, // JSON
        price: payload.price || undefined,
        category_id: payload?.category?.id || undefined,
      },
      where: {
        id: serviceId,
      },
    });
    return updatedService;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
