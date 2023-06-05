import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { User } from '@prisma/client';
import { db } from '../../../prisma';
import Boom from '@hapi/boom';

export const getNotifications = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User;
    const limit = Number(request.query.limit || 10);
    return await db.notification.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: limit,
    });
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
