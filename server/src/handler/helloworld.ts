import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';

export const hellowordHandler = (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  return 'Hello, world';
};
