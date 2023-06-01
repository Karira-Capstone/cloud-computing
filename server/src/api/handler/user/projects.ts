import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { Client, User } from '@prisma/client';
import { db } from '../../../prisma';
import Boom from '@hapi/boom';

export const getYourOwnProjectsHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      client: Client;
    };
    const projects = await db.project.findMany({
      where: {
        client_id: user.client.id,
      },
      include: {
        bids: {
          include: {
            worker: {
              include: {
                user: true,
              },
            },
          },
        },
        category: true,
        order: true,
      },
    });
    return projects;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
