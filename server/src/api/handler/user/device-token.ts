import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { User } from '@prisma/client';
import { db } from '../../../prisma';
import Boom from '@hapi/boom';

export const updateDeviceToken = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User;
    const payload = request.payload as any;
    return await db.user.update({
      data: {
        device_token: payload.device_token,
      },
      where: {
        id: user.id,
      },
    });

  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
