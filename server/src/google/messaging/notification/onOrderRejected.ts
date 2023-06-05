import { db } from '../../../prisma';
import { notificationPublisher } from '../publisher';

export const notificationOnOrderRejected = async (order_id: number) => {
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
    'Pesanan Ditolak!',
    'Yaah, Pesanan Kamu Ditolak. Tapi Jangan Khawatir, yuk cek rekomendasi kami',
  );
};
