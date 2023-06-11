import { MLPredictProxyClass } from "../../MLProxy";

class MLProxyPredictServiceBudgetClass extends MLPredictProxyClass {
  modelname = "service_budget";
  input_key = "input_1";
}

export const MLProxyPredictServiceBudget = new MLProxyPredictServiceBudgetClass();
