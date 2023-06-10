import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { User } from '@prisma/client';
import { db } from '../../../prisma';
import Boom from '@hapi/boom';

export const getYourOwnOrderHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User;
    if (user.role == 'CLIENT') {
      const orders = await db.order.findMany({
        where: {
          client: {
            user_id: user.id,
          },
        },
      });
      return orders;
    }
    const orders = await db.order.findMany({
      where: {
        worker: {
          user_id: user.id,
        },
      },
      include: {
        client: {
          include: {
            user: true,
          },
        },
        project: true,
        service: true,
      },
    });
    return orders;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
