import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { User } from '@prisma/client';
import { db } from '../../../prisma';
import Boom from '@hapi/boom';

export const getYourOwnProfileHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User;
    const profile = await db.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        client: {
          include: {
            orders: true,
            projects: {
              include: {
                order: {
                  include: {
                    worker: {
                      include: {
                        user: true,
                      },
                    },
                    client: {
                      include: {
                        user: true,
                      },
                    },
                  },
                },
              },
            },
            reviews: true,
          },
        },
        worker: {
          include: {
            reviews: true,
            services: {
              include: {
                orders: {
                  include: {
                    worker: {
                      include: {
                        user: true,
                      },
                    },
                    client: {
                      include: {
                        user: true,
                      },
                    },
                  },
                },
              },
            },
            skills: true,
          },
        },
      },
    });
    return profile;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
