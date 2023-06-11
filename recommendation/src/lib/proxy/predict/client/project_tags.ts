import { MLPredictProxyClass } from "../../MLProxy";

class MLProxyPredictProjectTagClass extends MLPredictProxyClass {
  modelname = "project_tags";
  input_key = "input_1";
}

export const MLProxyPredictProjectTag = new MLProxyPredictProjectTagClass();
