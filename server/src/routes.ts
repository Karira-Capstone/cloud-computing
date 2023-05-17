/* eslint-disable import/prefer-default-export */
import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { hellowordHandler } from './handler/helloworld';

export const route: ServerRoute<ReqRefDefaults>[] = [{
  method: 'GET',
  path: '/',
  handler: hellowordHandler
}];
