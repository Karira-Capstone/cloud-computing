/* eslint-disable import/prefer-default-export */
import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { hellowordHandler } from './handler/helloworld';
import { authHandler } from './handler/authHandler';
import { authenticatedRouteConfig } from './config/route';


export const route: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'GET',
    path: '/api',
    handler: hellowordHandler,
    options: authenticatedRouteConfig
  },
  {
    method: 'POST',
    path: '/api/authenticate',
    handler: authHandler,
    options:{
      auth: false
    }
  },
];
