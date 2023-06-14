import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { authenticatedRouteConfig, clientRouteConfig, workerRouteConfig } from '../../config/route';
import {
  callbackOrder,
  cancelOrderHandler,
  createOrderFromBidHandler,
  createOrderFromServiceHandler,
  createReviewByClientHandler,
  createReviewByWorkerHandler,
  findOrderHandler,
  finishOrderHandler,
} from '.';

export const orderRoute: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'POST',
    path: '/api/orders',
    handler: callbackOrder,
  },
  {
    method: 'GET',
    path: '/api/orders/{orderId}',
    handler: findOrderHandler,
    options: authenticatedRouteConfig,
  },
  {
    method: 'POST',
    path: '/api/orders/projects/bids/{bidId}',
    handler: createOrderFromBidHandler,
    options: clientRouteConfig,
  },
  {
    method: 'POST',
    path: '/api/orders/services/{serviceId}',
    handler: createOrderFromServiceHandler,
    options: clientRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/orders/{orderId}/cancel',
    handler: cancelOrderHandler,
    options: clientRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/orders/{orderId}/finish',
    handler: finishOrderHandler,
    options: clientRouteConfig,
  },
  {
    method: 'POST',
    path: '/api/orders/{orderId}/reviews/workers',
    handler: createReviewByClientHandler,
    options: clientRouteConfig,
  },
  {
    method: 'POST',
    path: '/api/orders/{orderId}/reviews/clients',
    handler: createReviewByWorkerHandler,
    options: workerRouteConfig,
  },
];
