import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { authenticatedRouteConfig, clientRouteConfig, workerRouteConfig } from '../../config/route';
import {
  getYourOwnOrderHandler,
  getYourOwnServicesHandler,
  getYourOwnProfileHandler,
  getYourOwnProjectsHandler,
  getGivenReviewsHandler,
} from '.';
import { updateDeviceToken } from './device-token';

export const userRoute: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'GET',
    path: '/api/users/profile',
    handler: getYourOwnProfileHandler,
    options: authenticatedRouteConfig,
  },
  {
    method: 'GET',
    path: '/api/users/services',
    handler: getYourOwnServicesHandler,
    options: workerRouteConfig,
  },
  {
    method: 'GET',
    path: '/api/users/projects',
    handler: getYourOwnProjectsHandler,
    options: clientRouteConfig,
  },
  {
    method: 'GET',
    path: '/api/users/orders',
    handler: getYourOwnOrderHandler,
    options: authenticatedRouteConfig,
  },
  {
    method: 'GET',
    path: '/api/users/reviews',
    handler: getGivenReviewsHandler,
    options: authenticatedRouteConfig,
  },
  {
    method: 'POST',
    path: '/api/users/device-token',
    handler: updateDeviceToken,
    options: authenticatedRouteConfig,
  },
];
