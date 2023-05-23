import Hapi, { Server } from '@hapi/hapi';
import jwt, { HapiJwt } from '@hapi/jwt';
import { createToken, jwt_user_strategy } from './config/authentication';
import { DEFAULT_IMAGE } from './constant/others';
import { db } from './prisma';
import { clientRoute, orderRoute, projectRoute, route, serviceRoute, workerRoute } from './handler';
const init = async function () {
  const server: Server = Hapi.server({
    port: process.env.PORT || 8000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(jwt);
  server.auth.strategy('jwt_user', 'jwt', jwt_user_strategy);
  
  server.route(route);
  server.route(clientRoute);
  server.route(orderRoute);
  server.route(projectRoute);
  server.route(serviceRoute);
  server.route(workerRoute);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

const initDev = async () => {
  await init();

  let user = await db.user.findUnique({
    where: {
      email: 'zidan.kharisma@ui.ac.id',
    },
  });
  if (!user) {
    user = await db.user.create({
      data: {
        email: 'zidan.kharisma@ui.ac.id',
        full_name: 'Zidan Kharisma',
        last_login: new Date(),
        picture: DEFAULT_IMAGE,
      },
    });
  }
  // console.log(createToken(user));
};

initDev();
