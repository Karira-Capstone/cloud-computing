import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { authenticatedRouteConfig } from '../../config/route';
import { uploadImageHandler } from './image';

export const uploadRoute: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'POST',
    path: '/api/upload',
    handler: uploadImageHandler,
    options: {
      ...authenticatedRouteConfig,
      payload: {
        output: 'stream',
        maxBytes: 1024 * 1024 * 100,
        multipart:{
            output: "stream"
        }
      },
    },
  },
];
