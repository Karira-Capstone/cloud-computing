import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';
dotenv.config({
  path: './.env.midtrans',
});
const midtransSnap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY,
});

export default midtransSnap