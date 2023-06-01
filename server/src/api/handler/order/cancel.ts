import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { db } from '../../../prisma';
import { Client, User, Worker } from '@prisma/client';

export const cancelOrderHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      client: Client;
    };
    const orderId = Number(request.params.orderId);
    await db.order.findFirstOrThrow({
      where: {
        client_id: user.client.id,
        id: orderId,
        status: {
          in: ['CREATED', 'ACCEPTED'],
        },
      },
    }).catch(()=>{
      throw Boom.notFound()
    })
    const updatedOrder = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: 'CANCELLED',
      },
    });
    return updatedOrder;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('');
  }
};
