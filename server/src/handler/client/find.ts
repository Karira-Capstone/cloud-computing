import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { db } from '../../prisma';

export const findClientHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const clientId = Number(request.params.clientId);
    const client = await db.client.findUnique({
      where: {
        id: clientId,
      },
      include: {
        user: true,
        projects: {
          where: {
            type: {
              in: ['APPROVED', 'INPROGRESS'],
            },
          },
        },
        reviews: true,
      },
    });
    return client;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
