import { MLPredictProxyClass } from "../../MLProxy";

class MLProxyPredictFindServiceClass extends MLPredictProxyClass {
  input_key = "input_1";
  modelname = "find_service";
}

export const MLProxyPredictFindService = new MLProxyPredictFindServiceClass();
