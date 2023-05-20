/* eslint-disable import/prefer-default-export */
import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { hellowordHandler } from './handler/helloworld';
import { authHandler } from './handler/authHandler';

export const route: ServerRoute<ReqRefDefaults>[] = [{
  method: 'GET',
  path: '/api',
  handler: hellowordHandler,
},{
  method: 'POST',
  path: '/api/authentication',
  handler: authHandler,
}];
