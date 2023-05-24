import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { db } from '../../prisma';
import { User } from '@prisma/client';

export const findOrderHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User;

    const orderId = Number(request.params.orderId);
    const order = await db.order.findFirstOrThrow({
      where: {
        id: orderId,
        OR: [
          {
            worker: {
              user_id: user.id,
            },
          },
          {
            client: {
              user_id: user.id,
            },
          },
        ],
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
