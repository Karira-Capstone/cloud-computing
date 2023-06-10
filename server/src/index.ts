import Hapi, { Server } from '@hapi/hapi';
import jwt, { HapiJwt } from '@hapi/jwt';
import { jwt_user_strategy } from './api/config/authentication';
import {
  clientRoute,
  orderRoute,
  projectRoute,
  route,
  serviceRoute,
  uploadRoute,
  workerRoute,
} from './api/handler';
import { userRoute } from './api/handler/user';
import midtransSnap from './lib/midtrans';
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
  server.route(uploadRoute);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

const initDev = async () => {
  await init();
  // let parameter = {
  //   transaction_details: {
  //     order_id: "zidan",
  //     gross_amount: 1250,
  //   },
  //   item_details: [
  //     {
  //       id: 'id1',
  //       price: 1250,
  //       quantity: 1,
  //       name: 'Bluedio H+ Turbine Headphone with Bluetooth 4.1 -',
  //     },
  //   ],
  //   customer_details: {
  //     first_name: 'Budi',
  //     last_name: 'Utomo',
  //     email: 'budi.utomo@midtrans.com',
  //     phone: '081223323423',
  //   },
  // };
  // console.log("ryan")
  // midtransSnap.createTransaction(parameter).then((transaction) => {
  //   // transaction token
  //   let transactionToken = transaction.token;
  //   console.log(transaction);
  //   console.log('transactionToken:', transactionToken);
  // }).catch((error) => {
  //   console.error(error);
  // })
};

initDev();
