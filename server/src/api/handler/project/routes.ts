import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { findProjectHandler } from './find';
import { clientRouteConfig, unauthenticatedRouteConfig } from '../../config/route';
import { createProjectHandler } from './create';
import { searchProjectHandler, updateProjectHandler } from '.';

export const projectRoute: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'GET',
    path: '/api/projects/{projectId}',
    handler: findProjectHandler,
    options: unauthenticatedRouteConfig,
  },
  {
    method: 'POST',
    path: '/api/projects',
    handler: createProjectHandler,
    options: clientRouteConfig,
  },
  {
    method: 'GET',
    path: '/api/projects',
    handler: searchProjectHandler,
    options: unauthenticatedRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/projects/{projectId}',
    handler: updateProjectHandler,
    options: clientRouteConfig,
  },
];
