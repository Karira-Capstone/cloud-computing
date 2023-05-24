import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { User } from '@prisma/client';
import { db } from '../../prisma';
import Boom from '@hapi/boom';

export const getGivenReviewsHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User;
    if (user.role == 'CLIENT') {
      const reviews = await db.review.findMany({
        where: {
          type: 'FOR_CLIENT',
          client: {
            user_id: user.id,
          },
        },
        include: {
          order: true,
          worker: {
            include: {
              user: true,
            },
          },
        },
      });
      return reviews.map((review) => {
        return {
          ...review,
          worker: review.anonymize ? null : review.worker,
        };
      });
    }
    const reviews = await db.review.findMany({
      where: {
        type: {
          in: ['FOR_SERVICE', 'FOR_WORKER'],
        },
        worker: {
          user_id: user.id,
        },
      },
      include: {
        order: true,
        client: {
          include: {
            user: true,
          },
        },
      },
    });
    return reviews.map((review) => {
      return {
        ...review,
        client: review.anonymize ? null : review.client,
      };
    }); // Anonymize reviews
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
