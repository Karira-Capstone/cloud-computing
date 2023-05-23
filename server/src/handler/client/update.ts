// edit profiles
import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';

export const updateClientHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  return `Hello, world`;
};
