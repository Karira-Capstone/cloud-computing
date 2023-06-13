import midtransSnap from '../../../../lib/midtrans';
import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Client, User, Worker } from '@prisma/client';
import { db } from '../../../../prisma';

export const createTransactionHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      client: Client;
    };
    const orderId = Number(request.params.orderId);
    const order = await db.order.findFirstOrThrow({
      where: {
        id: orderId,
        client_id: user.client.id,
      },
      include: {
        client: {
          include: {
            user: true,
          },
        },
      },
    });

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
    await db.order.update({
      where: {
        id: order.id,
      },
      data: {
        midtrans_redirect_uri: transaction.redirect_url,
        midtrans_token: transaction.token,
      },
    });
    return transaction;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('');
  }
};
