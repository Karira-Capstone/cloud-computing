import { db } from '..';

export const seedNotifications = async () => {
  // untuk worker:
  await db.notification.createMany({
    data: [
      {
        title: 'Tawaran Diterima!',
        description: 'Tawaran Kamu Untuk proyek 5 Disetujui',
        type: 'OTHER',
        user_id: '6b12afaa-72be-418c-a265-dcf69c3420cb',
      },
      {
        title: 'Ada Pesanan Baru!',
        description: 'Ada yang memesan layanan 4 milikmu',
        type: 'OTHER',
        user_id: '6b12afaa-72be-418c-a265-dcf69c3420cb',
      },
      {
        title: 'Pesanan Dibatalkan!',
        description: 'Jangan sedih! yuk cari proyek lain dari rekomendasi kami',
        type: 'OTHER',
        user_id: '6b12afaa-72be-418c-a265-dcf69c3420cb',
      },
    ],
  });
};
