import { MLProxyPredictServiceBudget } from "../../lib/proxy";
import { db } from "../../prisma";
import { Request, Response } from "express";

export const predictServiceBudgetHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await predictServiceBudget(data);
    res.send({
      result,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const predictServiceBudget = async (data: any) => {
  console.log(data);
  const text = `${data.title} ${data.description}`;
  const results = await MLProxyPredictServiceBudget.predict(text);
  return results[0];
};
