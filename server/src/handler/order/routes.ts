import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { authenticatedRouteConfig, clientRouteConfig, workerRouteConfig } from '../../config/route';
import {
  acceptOrderHandler,
  cancelOrderHandler,
  createOrderFromProjectHandler,
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
    path: '/api/orders/projects/{projectId}',
    handler: createOrderFromProjectHandler,
    options: clientRouteConfig,
  },
  {
    method: 'POST',
    path: '/api/orders/services/{servicesId}',
    handler: createOrderFromServiceHandler,
    options: clientRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/orders/{ordersId}/accept',
    handler: acceptOrderHandler,
    options: workerRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/orders/{ordersId}/reject',
    handler: rejectOrderHandler,
    options: workerRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/orders/{ordersId}/cancel',
    handler: cancelOrderHandler,
    options: authenticatedRouteConfig,
  },
  {
    method: 'PUT',
    path: '/api/orders/{ordersId}/finish',
    handler: finishOrderHandler,
    options: clientRouteConfig,
  },
];
