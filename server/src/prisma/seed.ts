import { PrismaClient } from '@prisma/client';
import { db } from '.';
import { seedSkillNCategory } from './script/skillNCategory';
import { seedUser } from './script/user';
import { seedProject } from './script/projects';
import { seedServices } from './script/services';
import { seedOrder } from './script/orders';
import { seedTags } from './script/tags';
import { seedNotifications } from './script/notifications';

const resetNSeed = async () => {
  console.log('Purging all data...');
  // console.log('Seeding new users...');
  await seedSkillNCategory();
  // await seedUser();
  // console.log('Seeding new projects and services...');
  // await seedProject();
  // await seedServices();
  // await seedTags();
  // console.log('Seeding new Orders');
  // await seedOrder();
  // console.log('Seeding new notifications');
  // await seedNotifications();
  // console.log('Done!');
};

resetNSeed()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
