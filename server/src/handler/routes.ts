/* eslint-disable import/prefer-default-export */
import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { hellowordHandler } from './helloworld';
import { authHandler } from './authHandler';
import { authenticatedRouteConfig, unauthenticatedRouteConfig } from '../config/route';


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
    options: unauthenticatedRouteConfig
  },
];
