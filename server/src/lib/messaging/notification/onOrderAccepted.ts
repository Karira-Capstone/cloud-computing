import { db } from '../../../prisma';
import { notificationPublisher } from '../publisher';

export const notificationOnOrderAccepted = async (order_id: number) => {
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
    'Pesanan Kamu Diterima',
    'Mohon segera melakukan pembayaran untuk pesananmu.',
  );
};
