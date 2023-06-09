import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Client, User } from '@prisma/client';
import { db } from '../../../prisma';
import { notificationOnOrderFromBid } from '../../../lib/messaging/notification';

export const createOrderFromBidHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      client: Client;
    };
    const payload = request.payload as any;
    const bid = await db.bid.findUniqueOrThrow({
      where: {
        id: Number(request.params.bidId),
      },
    });
    const order = await db.order.create({
      data: {
        attachment: payload?.attachment || undefined,
        description: payload.description,
        price: bid.price,
        status: 'CREATED',
        type: 'BID',
        worker: {
          connect: {
            id: bid.worker_id,
          },
        },
        client: {
          connect: {
            id: user.client.id,
          },
        },
        bid: {
          connect: {
            id: bid.id,
          },
        },
        project: {
          connect: {
            id: bid.project_id,
          },
        },
      },
    });
    // await notificationOnOrderFromBid(order.id);
    return order;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('');
  }
};
