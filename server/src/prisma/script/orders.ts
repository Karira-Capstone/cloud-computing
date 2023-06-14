import { ORDER_STATUS, ORDER_TYPE } from '@prisma/client';
import { db } from '..';

export const seedOrder = async () => {
  // create 5 bid on project: 5, 6, 7, 8, and 9
  const bids = await db.bid.createMany({
    data: bidsData,
  });
  // create 6 orders.
  await db.order.createMany({
    data: ordersdataFromBids,
  });
  // order proj. 5 is created, order proj. 6 is accepted
  // Order proj. 7 is rejected, order proj. 8 is paid
  // Order proj. 9 is Finished

  await db.order.createMany({
    data: ordersDataFromService,
  });
  // Service 2 : 1 accepted, 1 cancelled
  // Service 4 : 1 created, 1 paid, 1 Finished
};

const bidsData = Array(5)
  .fill(null)
  .map((_, idx) => {
    return {
      message: 'Ini pesan bid untuk project ' + String(5 + idx),
      price: 1000,
      worker_id: 1,
      project_id: 5 + idx,
      id: 1 + idx,
    };
  });

const ORDER_STATUS_LIST = [
  ORDER_STATUS.ACCEPTED,
  ORDER_STATUS.ACCEPTED,
  ORDER_STATUS.CANCELLED,
  ORDER_STATUS.PAID,
  ORDER_STATUS.FINISHED,
];
const ordersdataFromBids = bidsData.map((bid, idx) => {
  return {
    client_id: 1,
    description: `Ini adalah order yang dibuat dari project ${bid.project_id}`,
    price: 1000,
    status: ORDER_STATUS_LIST[idx],
    type: ORDER_TYPE.BID,
    worker_id: 1,
    bid_id: bid.id,
    project_id: bid.project_id,
  };
});

const ordersDataFromService = Array(5)
  .fill(null)
  .map((_, idx) => {
    const nomservice = [4, 2, 2, 4, 4][idx];
    return {
      client_id: 1,
      worker_id: 1,
      description: `Ini adalah order yang dibuat dari service ${nomservice}`,
      price: 1000,
      status: ORDER_STATUS_LIST[idx],
      type: ORDER_TYPE.SERVICE,
      service_id: nomservice,
    };
  });
