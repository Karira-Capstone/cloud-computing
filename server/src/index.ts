import Hapi, { Server } from '@hapi/hapi';
import jwt, { HapiJwt } from '@hapi/jwt';
import { jwt_user_strategy } from './api/config/authentication';
import { clientRoute, orderRoute, projectRoute, route, serviceRoute, uploadRoute, workerRoute } from './api/handler';
import { userRoute } from './api/handler/user';
const init = async function () {
  const server: Server = Hapi.server({
    port: process.env.PORT || 8000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
    debug: { request: ['error'] },
  });

  await server.register(jwt);
  server.auth.strategy('jwt_user', 'jwt', jwt_user_strategy);

  server.route(route);
  server.route(clientRoute);
  server.route(orderRoute);
  server.route(projectRoute);
  server.route(serviceRoute);
  server.route(workerRoute);
  server.route(userRoute);
  server.route(uploadRoute)

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

const initDev = async () => {
  await init();
};

initDev();
