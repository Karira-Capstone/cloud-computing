import Hapi, { Server } from '@hapi/hapi';
import { route } from './routes';

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

  server.route(route);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
