// update profile
import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { User, Worker } from '@prisma/client';
import { db } from '../../prisma';

export const updateWorkerHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      worker: Worker;
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
    const updatedWorker = await db.worker.update({
      where: {
        id: user.worker.id,
      },
      data: {
        address: payload.address || undefined,
        birth_date: payload.birth_date || undefined,
        city: payload.city || undefined,
        description: payload.description || undefined,
        identity_number: payload.identity_number || undefined,
        phone: payload.phone || undefined,
        province: payload.province || undefined,
        skills: {
          connect: payload.skills || undefined,
        },
      },
      include: {
        user: true,
      },
    });
    return updatedWorker;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('Unexpected error');
  }
};
