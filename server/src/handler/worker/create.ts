// find user by email, check role undefined, make as worker. Create worker
import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';

export const createWorkerHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  return `Hello, world`;
};
