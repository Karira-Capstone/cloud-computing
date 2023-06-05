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
      'Ada Tawaran Freelancer!',
      `Sudah ada yang menawar proyek ${project.title} milikmu, yuk cek dahulu`,
    );
  }
  if (project.bids.length == 5) {
    await notificationPublisher(
      project.client.user,
      'Proyek Kamu Ramai Tawaran',
      `Banyak yang menawar ${project.title} milikmu, yuk cek dahulu`,
    );
  }
};
