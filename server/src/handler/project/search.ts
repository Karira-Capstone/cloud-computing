import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';

export const searchProjectHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  return `Hello, world`;
};
