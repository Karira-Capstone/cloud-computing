import { MLPredictProxyClass } from "../../MLProxy";

class MLProxyPredictProjectBudgetClass extends MLPredictProxyClass {
  modelname = "project_budget";
  input_key = "input_3";
}

export const MLProxyPredictProjectBudget = new MLProxyPredictProjectBudgetClass();
