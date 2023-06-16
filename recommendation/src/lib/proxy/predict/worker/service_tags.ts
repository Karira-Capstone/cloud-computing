import { MLPredictProxyClass } from "../../MLProxy";

class MLProxyPredictServiceTagsClass extends MLPredictProxyClass {
  modelname = "service_tags";
  input_key = "input_1";
}

export const MLProxyPredictServiceTags = new MLProxyPredictServiceTagsClass()
