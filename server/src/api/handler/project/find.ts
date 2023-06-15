import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { db } from '../../../prisma';

export const findProjectHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const projectId = Number(request.params.projectId);
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        order: {
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
          },
        },
        bids: {
          include: {
            order: true,
            worker: {
              include: {
                user: true,
                skills: true,
              },
            },
          },
        },
        skills: true,
        category: true,
        client: {
          include: {
            user: true,
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
    throw Boom.badGateway('');
  }
};
