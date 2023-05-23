import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';

export const findOrderHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  return `Hello, world`;
};
