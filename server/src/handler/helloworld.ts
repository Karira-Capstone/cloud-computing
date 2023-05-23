import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { db } from '../prisma';

export const hellowordHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  return `Hello, world`;
};
