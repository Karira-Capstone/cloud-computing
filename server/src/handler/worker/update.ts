// update profile
import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';

export const updateWorkerHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  return `Hello, world`;
};
