import { NOTIFICATION_TYPE, User } from '@prisma/client';
import { firebaseAdmin } from '../firebase';
import { db } from '../../prisma';

const firebaseCloudMessage = firebaseAdmin.messaging();

export const notificationPublisher = async (user: User, title: string, body: string) => {
  await db.notification.create({
    data: {
      title: title,
      description: body,
      type: NOTIFICATION_TYPE.OTHER,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  if (!!user.device_token) {
    await firebaseCloudMessage.send({
      token: user.device_token,
      notification: {
        title: title,
        body: body,
      },
    });
  }
};
