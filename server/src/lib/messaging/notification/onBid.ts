import { db } from '../../../prisma';
import { notificationPublisher } from '../publisher';

export const notificationOnBid = async (project_id: number) => {
  // check if the bid on said project == 1, or == 5
  const project = await db.project.findUniqueOrThrow({
    where: {
      id: project_id,
    },
    include: {
      bids: true,
      client: {
        include: {
          user: true,
        },
      },
    },
  });
  if (project.bids.length == 1) {
    await notificationPublisher(
      project.client.user,
      'Tawaran Freelancer Masuk',
      `Proyek ${project.title} milikmu telah menerima satu tawaran. Silakan cek sekarang.`,
    );
  }
  if (project.bids.length == 5) {
    await notificationPublisher(
      project.client.user,
      'Banyak Tawaran untuk Proyek Kamu',
      `Proyek ${project.title} milikmu telah menerima banyak tawaran. Silakan cek sekarang.`,
    );
  }
};
