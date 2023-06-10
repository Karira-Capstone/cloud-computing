import { db } from '../../../../prisma';
import { notificationPublisher } from '../../publisher';

export const notificationOnPaymentAccepted = async (order_id: number) => {
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
      'Pembayaran Sukses!',
      'Pembayaran telah diterima. Transaksi akan kami teruskan.',
    ),
    notificationPublisher(
      order.worker.user,
      'PPembayaran Terkonfirmasi!',
      'Pembayaran oleh klien telah kami terima. Segera selesaikan proyek agar kamu dapat menerima imbalan',
    ),
  ]);
};
