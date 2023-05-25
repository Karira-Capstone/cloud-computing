import { db } from '..';

export const seedUser = async () => {
  // insert 3 user: undefined, worker, client
  const user_1 = await db.user.create({
    data: {
      id: '54ae1dea-9b35-4f67-ad05-bfaffbef2b75',
      email: 'user1@example.com',
      full_name: 'user1',
      last_login: new Date(),
      picture: 'example.jpg',
      role: 'UNDEFINED',
    },
  });
  const user_2_worker = await db.user.create({
    data: {
      id: '599ef80d-88ac-459c-8a6e-04c4f171a5d5',
      email: 'user2@example.com',
      full_name: 'user2',
      last_login: new Date(),
      picture: 'example.jpg',
      role: 'WORKER',
      onboarded: true,
      worker: {
        create: {
          address: 'address1',
          birth_date: new Date(),
          city: 'city1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          identity_number: '111111111111',
          phone: '628567681245',
          province: 'province1',
          skills: {
            connect: [
              {
                id: 1,
              },
              {
                id: 2,
              },
            ],
          },
        },
      },
    },
  });

  const user_3_worker = await db.user.create({
    data: {
      id: '6b12afaa-72be-418c-a265-dcf69c3420cb',
      email: 'user3@example.com',
      full_name: 'user3',
      last_login: new Date(),
      picture: 'example.jpg',
      role: 'CLIENT',
      onboarded: true,
      client: {
        create: {
          phone: '628567681246',
        },
      },
    },
  });
};
