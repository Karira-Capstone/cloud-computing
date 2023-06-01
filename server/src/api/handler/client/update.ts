// edit profiles
import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Client, User } from '@prisma/client';
import { db } from '../../../prisma';

export const updateClientHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      client: Client;
    };
    const payload = request.payload as any;
    if (payload.full_name || payload.picture) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          full_name: payload.full_name || undefined,
          picture: payload.picture || undefined,
        },
      });
    }
    const updatedClient = await db.client.update({
      where: {
        id: user.client.id,
      },
      data: {
        phone: payload.phone || undefined,
      },
      include: {
        user: true,
      },
    });
    return updatedClient;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('');
  }
};
