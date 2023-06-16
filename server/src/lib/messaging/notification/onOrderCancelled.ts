import { db } from '../../../prisma';
import { notificationPublisher } from '../publisher';

export const notificationOnOrderCancelled = async (order_id: number) => {
  const order = await db.order.findUnique({
    where: {
      id: order_id,
    },
    include: {
      client: {
        include: {
          user: true,
        },
      },
    },
  });
  await notificationPublisher(
    order.client.user,
    'Pesanan Dibatalkan',
    'Maaf, pesananmu telah dibatalkan. Silakan cari proyek lain dari rekomendasi kami.',
  );
};
