import { Project } from "@prisma/client";
import { db } from "../../../prisma";

export const projectCreatedHandler = async (message: any) => {
  const data = JSON.parse(message.data.toString()) as Project;
  console.log(data);
  const { id, title, description, duration } = data;
  const predictedSkills = (
    await db.skill.findMany({
      take: 2,
    })
  ).map((skill) => skill.title);

  const predictedSkillsObject = await db.skill.findMany({
    where: {
      title: {
        in: predictedSkills,
      },
    },
    include: {
      category: true,
    },
  });
  console.log(predictedSkillsObject);

  const updatedProject = await db.project.update({
    where: {
      id: id,
    },
    data: {
      skills: {
        connect: predictedSkillsObject.map((x) => {
          return {
            id: x.id,
          };
        }),
      },
      category: {
        connect: {
          id: predictedSkillsObject[0].category_id,
        },
      },
    },
  });

  console.log("Updated project");
  message.ack();
};
