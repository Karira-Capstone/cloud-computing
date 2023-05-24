/* eslint-disable import/prefer-default-export */
import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { hellowordHandler } from './helloworld';
import { authHandler } from './authHandler';
import { unauthenticatedRouteConfig } from '../config/route';

export const route: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'GET',
    path: '/api',
    handler: hellowordHandler,
    options: {
      auth: {
        mode: 'try',
        strategy: 'jwt_user',
      },
    },
  },
  {
    method: 'POST',
    path: '/api/authenticate',
    handler: authHandler,
    options: unauthenticatedRouteConfig,
  },
];
