import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { User, Worker } from '@prisma/client';
import { db } from '../../prisma';

export const acceptOrderHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      worker: Worker;
    };
    const orderId = Number(request.params.orderId);
    await db.order.findFirstOrThrow({
      where: {
        worker_id: user.worker.id,
        id: orderId,
        status: 'CREATED',
      },
    }).catch(()=>{
      throw Boom.unauthorized("")
    })

    const updatedOrder = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: 'ACCEPTED',
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
