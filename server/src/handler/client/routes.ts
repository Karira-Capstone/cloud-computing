import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import {
  authenticatedRouteConfig,
  clientRouteConfig,
  unauthenticatedRouteConfig,
} from '../../config/route';
import { createClientHandler, findClientHandler, updateClientHandler } from '.';

export const clientRoute: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'POST',
    path: '/api/clients',
    handler: createClientHandler,
    options: authenticatedRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/clients',
    handler: updateClientHandler,
    options: clientRouteConfig,
  },
  {
    method: 'GET',
    path: '/api/clients/{id}',
    handler: findClientHandler,
    options: unauthenticatedRouteConfig,
  },
];
