import midtransClient from 'midtrans-client';

console.log(process.env.SERVER_KEY)
const midtransSnap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY,
});

export default midtransSnap