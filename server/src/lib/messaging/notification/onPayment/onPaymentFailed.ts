import { db } from '../../../../prisma';
import { notificationPublisher } from '../../publisher';

export const notificationOnPaymentFailed = async (order_id: number) => {
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
      worker: {
        include: {
          user: true,
        },
      },
    },
  });
  await Promise.all([
    notificationPublisher(
      order.client.user,
      'Pembayaran Gagal!',
      'Pembayaran ditolak. Pesanan akan otomatis dibatalkan',
    ),
    notificationPublisher(
      order.worker.user,
      'Klien Gagal Membayar',
      'Pembayaran oleh klien ditolak sehingga pesanan otomatis dibatalkan.',
    ),
  ]);
};
