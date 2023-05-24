import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Client, User, Worker } from '@prisma/client';
import { db } from '../../../prisma';

export const createReviewByClientHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      client: Client;
    };
    const orderId = Number(request.params.orderId);
    const payload = request.payload as any;
    const order = await db.order.findUniqueOrThrow({
      where: {
        id: orderId,
      },
      include: {
        client: true,
        worker: true,
        service: true,
      },
    });
    if (order.client.id != user.client.id) {
      throw Boom.unauthorized('You are not allowed to make this review');
    }
    const isService = order.type == 'SERVICE';
    const review = await db.review.create({
      data: {
        anonymize: payload.anonymize,
        description: payload.description,
        score: payload.score,
        type: isService ? 'FOR_SERVICE' : 'FOR_CLIENT',
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
        service: {
          connect: {
            id: isService ? order.service_id : undefined,
          },
        },
      },
    });
    if (review.type == 'FOR_SERVICE') {
      await updateServiceScore(review.service_id, payload.score);
    }
    await updateWorkerScore(review.worker_id, payload.score);
    return review;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};

const updateWorkerScore = async (worker_id: number, score: number) => {
  const worker = await db.worker.findUnique({
    where: {
      id: worker_id,
    },
  });
  const totalScore = worker.avg_rating * worker.num_of_reviews;
  await db.worker.update({
    where: {
      id: worker_id,
    },
    data: {
      avg_rating: (totalScore + score) / (worker.num_of_reviews + 1),
      num_of_reviews: {
        increment: 1,
      },
    },
  });
};

const updateServiceScore = async (service_id: number, score: number) => {
  const service = await db.service.findUnique({
    where: {
      id: service_id,
    },
  });
  const totalScore = service.avg_rating * service.num_of_reviews;
  await db.service.update({
    where: {
      id: service_id,
    },
    data: {
      avg_rating: (totalScore + score) / (service.num_of_reviews + 1),
      num_of_reviews: {
        increment: 1,
      },
    },
  });
};
