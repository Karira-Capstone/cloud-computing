import midtransClient from 'midtrans-client';
const midtransSnap = new midtransClient.Snap({
  isProduction: true,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY,
});

export default midtransSnap