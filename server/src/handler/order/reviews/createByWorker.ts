import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { User, Worker } from '@prisma/client';
import { db } from '../../../prisma';

export const createReviewByWorkerHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      worker: Worker;
    };
    const orderId = Number(request.params.orderId);
    const payload = request.payload as any;
    const order = await db.order
      .findFirstOrThrow({
        where: {
          id: orderId,
          worker_id: user.worker.id,
        },
        include: {
          client: true,
          worker: true,
          service: true,
        },
      })
      .catch(() => {
        throw Boom.unauthorized();
      });
    const review = await db.review.create({
      data: {
        anonymize: payload.anonymize,
        description: payload.description,
        score: payload.score,
        type: 'FOR_CLIENT',
        worker: {
          connect: {
            id: order.worker_id,
          },
        },
        client: {
          connect: {
            id: order.client_id,
          },
        },
        order: {
          connect: {
            id: order.id,
          },
        },
      },
    });
    await updateClientScore(review.client_id, payload.score);
    return review;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('');
  }
};

const updateClientScore = async (client_id: number, score: number) => {
  const client = await db.client.findUnique({
    where: {
      id: client_id,
    },
  });
  const totalScore = client.avg_rating * client.num_of_reviews;
  await db.client.update({
    where: {
      id: client_id,
    },
    data: {
      avg_rating: (totalScore + score) / (client.num_of_reviews + 1),
      num_of_reviews: {
        increment: 1,
      },
    },
  });
};
