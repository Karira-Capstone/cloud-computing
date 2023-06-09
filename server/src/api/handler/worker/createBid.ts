import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { User, Worker } from '@prisma/client';
import { db } from '../../../prisma';
import { notificationOnBid } from '../../../lib/messaging/notification/onBid';

export const createBidForProjectHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      worker: Worker;
    };
    const projectId = Number(request.params.projectId);
    const payload = request.payload as any;
    await db.project.findFirstOrThrow({
      where: {
        id: projectId,
        type: {
          in: ['APPROVED', 'INPROGRESS'],
        },
      },
    });
    const createdBid = await db.bid.create({
      data: {
        message: payload.message,
        price: payload.price,
        attachment: payload.attachment,
        worker: {
          connect: {
            id: user.worker.id,
          },
        },
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });
    await notificationOnBid(createdBid.project_id);
    return createdBid;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest();
  }
};
