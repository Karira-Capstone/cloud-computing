import { MLPredictProxyClass } from "../../MLProxy";

class MLProxyPredictFindProjectClass extends MLPredictProxyClass {
  modelname = "find_project";
  input_key = "input_1";
}

export const MLProxyPredictFindProject = new MLProxyPredictFindProjectClass()
