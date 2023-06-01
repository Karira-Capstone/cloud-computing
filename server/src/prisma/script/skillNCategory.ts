import { db } from '..';

export const seedSkillNCategory = async () => {
  await db.category.createMany({
    data: [
      {
        title: 'kategori 1',
      },
      {
        title: 'kategori 2',
      },
      {
        title: 'kategori 3',
      },
      {
        title: 'kategori 4',
      },
    ],
  });
  await db.skill.createMany({
    data: [
      {
        title: 'skill 1',
        category_id: 1,
      },
      {
        title: 'skill 2',
        category_id: 2,
      },
      {
        title: 'skill 3',
        category_id: 3,
      },
      {
        title: 'skill 4',
        category_id: 4,
      },
    ],
  });
};
