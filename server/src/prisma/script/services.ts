import { db } from "..";


export const seedServices = async () => {
    const worker = await db.worker.findFirstOrThrow();
    await db.service.createMany({
      data: [
        {
          title: 'Service 1 On Review',
          type: 'ONREVIEW',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          images: {
            nama_gambar1: 'example1.jpg',
            nama_gambar2: 'example2.jpg',
            nama_gambar3: 'example3.jpg',
          },
          price: 1000000,
          category_id: 1,
          worker_id: worker.id,
        },
        {
          title: 'Service 2 Approved',
          type: 'APPROVED',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          images: {
            nama_gambar1: 'example1.jpg',
            nama_gambar2: 'example2.jpg',
            nama_gambar3: 'example3.jpg',
          },
          price: 2000000,
          category_id: 1,
          worker_id: worker.id,
        },
        {
          title: 'Service 3 On Review',
          type: 'ONREVIEW',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          images: {
            nama_gambar1: 'example1.jpg',
            nama_gambar2: 'example2.jpg',
            nama_gambar3: 'example3.jpg',
          },
          price: 3000000,
          category_id: 3,
          worker_id: worker.id,
        },
        {
          title: 'Service 4 Approved',
          type: 'APPROVED',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          images: {
            nama_gambar1: 'example1.jpg',
            nama_gambar2: 'example2.jpg',
            nama_gambar3: 'example3.jpg',
          },
          price: 4000000,
          category_id: 4,
          worker_id: worker.id,
        },
      ],
    });
  };
  