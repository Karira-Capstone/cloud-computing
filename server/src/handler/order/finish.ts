import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Client, User } from '@prisma/client';
import { db } from '../../prisma';

export const finishOrderHandler = async (
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
        status: 'PAID',
      },
    }).catch(()=>{
      throw Boom.notFound()
    })

    const updatedOrder = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: 'FINISHED',
      },
    });

    await db.worker.update({
      where: {
        id: updatedOrder.worker_id,
      },
      data: {
        num_of_order: {
          increment: 1,
        },
      },
    });

    return updatedOrder;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
