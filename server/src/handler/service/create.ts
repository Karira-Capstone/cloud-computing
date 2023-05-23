import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';

export const createServiceHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  return `Hello, world`;
};
