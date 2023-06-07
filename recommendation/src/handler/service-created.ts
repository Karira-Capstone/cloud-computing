import { Service } from "@prisma/client";
import { db } from "../prisma";

export const serviceCreatedHandler = async (data: any)=>{
    const { id, title, description } = data;
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
}