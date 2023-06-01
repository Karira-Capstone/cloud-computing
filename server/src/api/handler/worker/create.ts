// find user by email, check role undefined, make as worker. Create worker
import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { USER_ROLE, User } from '@prisma/client';
import Boom from '@hapi/boom';
import { db } from '../../../prisma';

export const createWorkerHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User;
    const payload = request.payload as any;
    if (user.role != 'UNDEFINED') {
      throw Boom.badRequest('You Have Chosen a Role!');
    }
    const worker = await db.worker.create({
      data: {
        address: payload.address,
        birth_date: new Date(payload.birth_date),
        city: payload.city,
        description: payload.description,
        identity_number: payload.identity_number,
        phone: payload.phone,
        province: payload.province,
        user: {
          connect: {
            id: user.id,
          },
        },
        skills: {
          connect: payload.skills || undefined,
        },
      },
      include:{
        skills: true,
        user: true
      }
    });

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: USER_ROLE.WORKER,
        onboarded: true,
      },
    });
    return worker;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('Failed to create worker');
  }
};
