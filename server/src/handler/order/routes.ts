import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { authenticatedRouteConfig, clientRouteConfig, workerRouteConfig } from '../../config/route';
import {
  acceptOrderHandler,
  cancelOrderHandler,
  createOrderFromBidHandler,
  createOrderFromServiceHandler,
  findOrderHandler,
  finishOrderHandler,
  rejectOrderHandler,
} from '.';

export const orderRoute: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'GET',
    path: '/api/orders/{orderId}',
    handler: findOrderHandler,
    options: authenticatedRouteConfig,
  },
  {
    method: 'POST',
    path: '/api/orders/projects/{bidId}',
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
    path: '/api/orders/{orderId}/accept',
    handler: acceptOrderHandler,
    options: workerRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/orders/{orderId}/reject',
    handler: rejectOrderHandler,
    options: workerRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/orders/{orderId}/cancel',
    handler: cancelOrderHandler,
    options: authenticatedRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/orders/{orderId}/finish',
    handler: finishOrderHandler,
    options: clientRouteConfig,
  },
];
