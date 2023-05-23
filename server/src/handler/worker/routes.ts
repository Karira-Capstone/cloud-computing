import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { findWorkerHandler } from './find';
import {
  authenticatedRouteConfig,
  unauthenticatedRouteConfig,
  workerRouteConfig,
} from '../../config/route';
import { createWorkerHandler } from './create';
import { createBidForProjectHandler } from './createBid';
import { updateWorkerHandler } from './update';

export const workerRoute: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'POST',
    path: '/api/workers',
    handler: createWorkerHandler,
    options: authenticatedRouteConfig,
  },
  {
    method: 'GET',
    path: '/api/workers/{workerId}',
    handler: findWorkerHandler,
    options: unauthenticatedRouteConfig,
  },
  {
    method: 'POST',
    path: '/api/workers/bids/projects/{projectId}',
    handler: createBidForProjectHandler,
    options: workerRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/workers',
    handler: updateWorkerHandler,
    options: workerRouteConfig,
  },
];
