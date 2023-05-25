import { PrismaClient } from '@prisma/client';
import { db } from '.';
import { seedSkillNCategory } from './script/skillNCategory';
import { seedUser } from './script/user';
import { seedProject } from './script/projects';
import { seedServices } from './script/services';

const resetNSeed = async ()=>{
  console.log("Purging all data...")
  console.log("Seeding new users...")
  await seedSkillNCategory()
  await seedUser()
  console.log("Seeding new projects and services...")
  await seedProject()
  await seedServices()
  console.log("Done!")
}

resetNSeed()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })