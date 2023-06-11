import { MLProxyPredictFindProject, MLProxyPredictServiceTags } from "../../lib/proxy";
import { db } from "../../prisma";

export const serviceCreatedHandler = async (req, res) => {
  try {
    const data = JSON.parse(atob(req.body.message.data));
    await serviceCreated(data);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
const serviceCreated = async (data: any) => {
  const { id, title, description } = data;
  const predictedSkills = await MLProxyPredictServiceTags.predict(`${title} ${description}`);
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

  const updatedService = await db.service.update({
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

  console.log("Updated Service");

  const worker = await db.worker.findUnique({
    where: {
      id: updatedService.worker_id,
    },
    include: {
      services: true,
    },
  });
  const arr = [];
  worker.services.forEach((service) => {
    arr.push(service.title);
    arr.push(service.description);
    arr.push(service);
  });
  const predictedRecommendedTags = await MLProxyPredictFindProject.predict(arr.join(" "));

  const predictedRecommendedTagsObject = await db.skill.findMany({
    where: {
      title: {
        in: predictedRecommendedTags,
      },
    },
    include: {
      category: true,
    },
  });
  console.log(predictedRecommendedTagsObject);

  await db.user.update({
    where: {
      id: worker.user_id,
    },
    data: {
      recommendation_tags: {
        connect: predictedRecommendedTagsObject.map((x) => {
          return {
            id: x.id,
          };
        }),
      },
    },
  });
  console.log("Updated Recommendation To User!");
};
