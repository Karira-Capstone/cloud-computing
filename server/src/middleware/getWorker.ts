// find user by email, check role undefined, make as worker. Create worker
import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { db } from '../prisma';
import Boom from '@hapi/boom';

export const getWorker = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  const user_id = (request.auth.credentials.user as any).id;
  const user = await db.user.findUnique({
    where: {
      id: user_id,
    },
    include: {
      worker: true,
    },
  });
  if (!user || !user.is_active) {
    throw Boom.badRequest('no active user with such credentials!');
  }
  return user;
};
