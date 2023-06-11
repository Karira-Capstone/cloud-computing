import { SERVICE_STATUS } from '@prisma/client';
import { db } from '..';

const titles = [
  'Service 1 On Review',
  'Service 2 Approved (1 accepted, 1 cancelled)',
  'Service 3 On Review',
  'Service 4 Approved (1 created, 1 paid, 1 Finished)',
];
const status = [
  SERVICE_STATUS.ONREVIEW,
  SERVICE_STATUS.APPROVED,
  SERVICE_STATUS.ONREVIEW,
  SERVICE_STATUS.APPROVED,
];

export const seedServices = async () => {
  const worker = await db.worker.findFirstOrThrow();
  await db.service.createMany({
    data: Array(4)
      .fill(null)
      .map((_, idx) => {
        return {
          id: idx + 1,
          title: titles[idx],
          type: status[idx],
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          images: {
            nama_gambar1:
              'https://storage.googleapis.com/karira/599ef80d-88ac-459c-8a6e-04c4f171a5d5/1686411167315_yuutouko.png',
            nama_gambar2:
              'https://storage.googleapis.com/karira/599ef80d-88ac-459c-8a6e-04c4f171a5d5/1686411167319_RDT_20220827_164143862666761907423819.jpg',
            nama_gambar3:
              'https://storage.googleapis.com/karira/599ef80d-88ac-459c-8a6e-04c4f171a5d5/1685668734129_16322836352272.jpg',
          },
          price: 1000000,
          category_id: 1,
          worker_id: worker.id,
        };
      }),
  });
  const services = await db.service.findMany();
  // const promises = services.map((service) => {
  //   return db.service.update({
  //     where: {
  //       id: service.id,
  //     },
  //     data: {
  //       skills: {
  //         connect: [1, 2, 3, 4].map((number) => {
  //           return {
  //             id: number,
  //           };
  //         }),
  //       },
  //     },
  //   });
  // });
  // await Promise.all(promises);
};
