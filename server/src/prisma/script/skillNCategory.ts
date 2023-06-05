import { resolve } from 'path';
import { db } from '..';
import fs from 'fs';
import events from 'events';
import readline from 'readline';

const createSkillNCategory = async (fileName: string): Promise<void> => {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(`${__dirname}/skills/${fileName}`),
      crlfDelay: Infinity,
    });
    let skills = [];
    rl.on('line', (line) => {
      skills = [...skills, line];
    });
    await events.once(rl, 'close');
    console.log(`Adding ${skills.length} skills from ${fileName}`);
    await db.category.create({
      data: {
        title: fileName.replace('.txt', ''),
        skills: {
          createMany: {
            data: skills.map((skill) => {
              return {
                title: skill,
              };
            }),
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const seedSkillNCategory = async () => {
  await Promise.all(fs.readdirSync(`${__dirname}/skills`).map((fileName) => createSkillNCategory(fileName)));
};
