import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { Client, User } from '@prisma/client';
import { db } from '../../../prisma';
import Boom from '@hapi/boom';

export const getYourRecommendation = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const _user = request.pre.user as User;
    const user = await db.user.findUnique({
      where: {
        id: _user.id,
      },
      include: {
        recommendation_tags: true,
      },
    });
    let skillsId = [];
    if (user.recommendation_tags.length == 0) {
      if (user.role == 'CLIENT') return [];
      const worker = await db.worker.findFirst({
        where: {
          user_id: user.id,
        },
        include: {
          skills: true,
        },
      });
      skillsId = worker.skills.map((skill) => skill.id);
    } else {
      skillsId = user.recommendation_tags.map((recommendation) => recommendation.id);
    }

    if (user.role == 'WORKER') {
      const projects = await db.project.findMany({
        where: {
          skills: {
            some: {
              id: {
                in: skillsId,
              },
            },
          },
          type: {
            in: ['APPROVED', 'INPROGRESS'],
          },
        },
        include: {
          client: {
            include: {
              user: true,
            },
          },
        },
        take: 10,
      });
      return projects;
    }
    const services = await db.service.findMany({
      where: {
        skills: {
          some: {
            id: {
              in: skillsId,
            },
          },
        },
        type: 'APPROVED',
      },
      include: {
        worker: {
          include: {
            user: true,
            skills: true
          },
        },
      },
    });
    return services;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badGateway('');
  }
};
