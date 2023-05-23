import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';

export const updateServiceHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  return `Hello, world`;
};
