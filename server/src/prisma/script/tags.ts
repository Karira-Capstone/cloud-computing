import { db } from '..';

export const seedTags = async () => {
  const category = await db.category.findFirst({
    include: {
      skills: {
        take: 4,
      },
    },
  });

  const projects = await db.project.findMany();
  await Promise.all(
    projects.map((project) => {
      return db.project.update({
        where: {
          id: project.id,
        },
        data: {
          category_id: category.id,
          skills: {
            connect: category.skills.map((skill) => {
              return {
                id: skill.id,
              };
            }),
          },
        },
      });
    }),
  );
  const services = await db.service.findMany();
  await Promise.all(
    services.map((service) => {
      return db.service.update({
        where: {
          id: service.id,
        },
        data: {
          category_id: category.id,
          skills: {
            connect: category.skills.map((skill) => {
              return {
                id: skill.id,
              };
            }),
          },
        },
      });
    }),
  );
};
