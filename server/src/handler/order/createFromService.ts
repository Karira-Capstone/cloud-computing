import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Client, User } from '@prisma/client';
import { db } from '../../prisma';

export const createOrderFromServiceHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      client: Client;
    };
    const service = await db.service.findUnique({
      where: {
        id: Number(request.params.serviceId),
      },
    });
    const payload = request.payload as any;
    const order = await db.order.create({
      data: {
        attachment: payload.attachment,
        description: payload.description,
        price: payload.price,
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
    return order;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
