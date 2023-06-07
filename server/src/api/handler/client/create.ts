// find user by email, check role undefined, make as worker. Create worker
import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { USER_ROLE, User } from '@prisma/client';
import { db } from '../../../prisma';

export const createClientHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User;
    const payload = request.payload as any;
    if (user.role != 'UNDEFINED') {
      throw Boom.badRequest('You Have Chosen a Role!');
    }
    const client = await db.client.create({
      data: {
        address: "",
        birth_date: "",
        city: "",
        description: "",
        identity_number:"",
        phone: "",
        province:"",
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        user: true,
      },
    });
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: USER_ROLE.CLIENT,
        onboarded: true,
      },
    });
    return client;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('');
  }
};
