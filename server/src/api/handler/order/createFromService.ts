import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Client, User } from '@prisma/client';
import { db } from '../../../prisma';
import { notificationOnOrderFromService } from '../../../lib/messaging/notification';

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
        status: 'CREATED',
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
    });
    // await notificationOnOrderFromService(order.id)
    return order;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
