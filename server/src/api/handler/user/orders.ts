import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { ORDER_STATUS, User } from '@prisma/client';
import { db } from '../../../prisma';
import Boom from '@hapi/boom';

export const getYourOwnOrderHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User;
    const status = request.query.status ?? '';
    const statusArray = Array.isArray(status) ? status : status != '' ? [status] : undefined;
    if (user.role == 'CLIENT') {
      const orders = await db.order.findMany({
        where: {
          client: {
            user_id: user.id,
          },
          status: {
            in: statusArray,
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
        status: {
          in: statusArray,
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
