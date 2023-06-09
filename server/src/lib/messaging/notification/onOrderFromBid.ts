import { db } from '../../../prisma';
import { notificationPublisher } from '../publisher';

export const notificationOnOrderFromBid = async (order_id: number) => {
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
      project: true,
    },
  });
  await notificationPublisher(
    order.worker.user,
    'Tawaran Diterima',
    `Tawaran Kamu Untuk ${order.project.title} Disetujui`,
  );
};
