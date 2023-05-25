import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Client, User } from '@prisma/client';
import { db } from '../../prisma';

export const updateProjectHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User & {
      client: Client;
    };
    const projectId = Number(request.params.projectId);
    await db.project.findFirstOrThrow({
      where: {
        id: projectId,
        client_id: user.client.id,
      },
    });
    const payload = request.payload as any;
    const updatedProject = await db.project.update({
      data: {
        attachment: payload?.attachment || undefined,
        category_id: payload?.category?.id || undefined,
        description: payload?.description || undefined,
        duration: payload?.duration || undefined,
        lower_bound: payload?.lower_bound || undefined,
        upper_bound: payload?.upper_bound || undefined,
        title: payload?.title || undefined,
      },
      where: {
        id: projectId,
      },
      include:{
        category: true,
      }
    });
    return updatedProject;
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('');
  }
};
