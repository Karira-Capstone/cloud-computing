import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { db } from '../../prisma';

export const hellowordHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  if (request.auth.isAuthenticated) {
    return `Hello, ${(request.auth.credentials.user as any).name}`;
  }
  return `Hello, Anonymous`;
};
