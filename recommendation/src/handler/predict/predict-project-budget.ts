import { Request, Response } from "express";
import { MLProxyPredictProjectBudget } from "../../lib/proxy";

export const predictProjectBudgetHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await predictProjectBudget(data);
    res.send({
      result,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const predictProjectBudget = async (data: any) => {
  console.log(data);
  const text = `${data.title} ${data.description}`;
  const results = await MLProxyPredictProjectBudget.predict(text);
  return results[0]
};
