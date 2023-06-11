import { MLProxyPredictProjectTag } from "../../lib/proxy";
import { db } from "../../prisma";

export const projectCreatedHandler = async (req, res) => {
  try {
    const data = JSON.parse(atob(req.body.message.data));
    await projectCreated(data);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const projectCreated = async (data: any) => {
  console.log(data);
  const { id, title, description, duration } = data;
  const predictedSkills = await MLProxyPredictProjectTag.predict(`${title} ${description} ${duration}`);

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
};
