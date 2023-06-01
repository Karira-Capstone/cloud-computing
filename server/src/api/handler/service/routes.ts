import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { unauthenticatedRouteConfig, workerRouteConfig } from '../../config/route';
import {
  createServiceHandler,
  findServiceHandler,
  searchServiceHandler,
  updateServiceHandler,
} from '.';

export const serviceRoute: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'GET',
    path: '/api/services/{serviceId}',
    handler: findServiceHandler,
    options: unauthenticatedRouteConfig,
  },
  {
    method: 'GET',
    path: '/api/services',
    handler: searchServiceHandler,
    options: unauthenticatedRouteConfig,
  },
  {
    method: 'POST',
    path: '/api/services',
    handler: createServiceHandler,
    options: workerRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/services/{serviceId}',
    handler: updateServiceHandler,
    options: workerRouteConfig,
  },
];
