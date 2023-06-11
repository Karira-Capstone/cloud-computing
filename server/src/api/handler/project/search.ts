import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { db } from '../../../prisma';

export const searchProjectHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const title = request.query.q;
    const projects = await db.project.findMany({
      where: {
        title: {
          contains: title,
        },
        type: {
          in: ['APPROVED', 'INPROGRESS'],
        },
      },
      include: {
        client: {
          include: {
            user: true,
          },
        },
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
