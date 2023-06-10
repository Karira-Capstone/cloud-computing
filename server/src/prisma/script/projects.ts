import { db } from '..';

export const seedProject = async () => {
  const client = await db.client.findFirstOrThrow();
  await db.project.createMany({
    data: [
      {
        id: 1,
        title: 'project 1 onreview',
        type: 'ONREVIEW',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        duration: 7,
        lower_bound: 100000,
        upper_bound: 1000000,
        attachment: 'attachement.zip',
        category_id: 1,
        client_id: client.id,
      },
      {
        id: 2,
        title: 'project 2 approved',
        type: 'APPROVED',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        duration: 7,
        lower_bound: 200000,
        upper_bound: 2000000,
        attachment: 'attachement.zip',
        category_id: 2,
        client_id: client.id,
      },
      {
        id: 3,
        title: 'project 3 onreview',
        type: 'ONREVIEW',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        duration: 7,
        lower_bound: 300000,
        upper_bound: 3000000,
        attachment: 'attachement.zip',
        category_id: 3,
        client_id: client.id,
      },
      {
        id: 4,
        title: 'project 4 approved',
        type: 'APPROVED',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        duration: 7,
        lower_bound: 400000,
        upper_bound: 4000000,
        attachment: 'attachement.zip',
        category_id: 4,
        client_id: client.id,
      },
      {
        id: 5,
        title: 'project 5 INPROGRESS',
        type: 'INPROGRESS',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        duration: 7,
        lower_bound: 400000,
        upper_bound: 4000000,
        attachment: 'attachement.zip',
        category_id: 4,
        client_id: client.id,
      },
      {
        id: 6,
        title: 'project 6 INPROGRESS',
        type: 'INPROGRESS',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        duration: 7,
        lower_bound: 400000,
        upper_bound: 4000000,
        attachment: 'attachement.zip',
        category_id: 4,
        client_id: client.id,
      },
      {
        id: 7,
        title: 'project 7 INPROGRESS',
        type: 'INPROGRESS',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        duration: 7,
        lower_bound: 400000,
        upper_bound: 4000000,
        attachment: 'attachement.zip',
        category_id: 4,
        client_id: client.id,
      },
      {
        id: 8,
        title: 'project 8 INPROGRESS',
        type: 'INPROGRESS',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        duration: 7,
        lower_bound: 400000,
        upper_bound: 4000000,
        attachment: 'attachement.zip',
        category_id: 4,
        client_id: client.id,
      },
      {
        id: 9,
        title: 'project 9 CLOSED (order selesai)',
        type: 'CLOSED',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        duration: 7,
        lower_bound: 400000,
        upper_bound: 4000000,
        attachment: 'attachement.zip',
        category_id: 4,
        client_id: client.id,
      },
    ],
  });
};
