import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';

export const finishOrderHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  return `Hello, world`;
};
