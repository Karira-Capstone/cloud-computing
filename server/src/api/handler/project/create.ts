import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Client, PROJECT_STATUS, User } from '@prisma/client';
import { db } from '../../../prisma';

export const createProjectHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      client: Client;
    };
    const payload = request.payload as any;
    const project = await db.project.create({
      data: {
        title: payload.title,
        description: payload.description,
        duration: payload.duration,
        attachment: payload.attachment,
        lower_bound: payload.lower_bound,
        upper_bound: payload.upper_bound,
        type: PROJECT_STATUS.ONREVIEW,
        client: {
          connect: {
            id: user.client.id,
          },
        },
      },
    });
    return project;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('');
  }
};
