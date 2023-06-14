import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Client, User } from '@prisma/client';
import { db } from '../../../prisma';
import { notificationOnOrderFromBid } from '../../../lib/messaging/notification';
import midtransSnap from '../../../lib/midtrans';

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
        status: 'ACCEPTED',
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
      include: {
        client: {
          include: {
            user: true,
          },
        },
        worker: {
          include: {
            user: true,
          },
        },
      },
    });
    await notificationOnOrderFromBid(order.id);
    let parameter = {
      transaction_details: {
        order_id: `${new Date().getTime()}-${order.id}`,
        gross_amount: order.price,
      },
      customer_details: {
        first_name: order.client.user.full_name,
        last_name: '',
        email: order.client.user.email,
        phone: order.client.phone,
      },
    };
    const transaction = await midtransSnap.createTransaction(parameter);
    const finalOrder = await db.order.update({
      where: {
        id: order.id,
      },
      data: {
        midtrans_redirect_uri: transaction.redirect_url,
        midtrans_token: transaction.token,
      },
    });
    return finalOrder;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('');
  }
};
