import { db } from '../../../prisma';
import { notificationPublisher } from '../publisher';

export const notificationOnOrderFromService = async (order_id: number) => {
  const order = await db.order.findUnique({
    where: {
      id: order_id,
    },
    include: {
      worker: {
        include: {
          user: true,
        },
      },
      service: true,
    },
  });
  await notificationPublisher(
    order.worker.user,
    'Ada Pesanan Baru',
    `Ada yang memesan layanan ${order.service.title} milikmu`,
  );
};
