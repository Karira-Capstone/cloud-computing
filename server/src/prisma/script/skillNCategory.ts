import { db } from "..";

export const seedSkillNCategory = async () => {
    await db.skill.createMany({
      data: [
        {
          title: 'skill 1',
        },
        {
          title: 'skill 2',
        },
        {
          title: 'skill 3',
        },
        {
          title: 'skill 4',
        },
      ],
    });
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
  };