export abstract class MLProxyClass {
  baseUrl = "http:///karira.id/v1/models/";
  abstract modelname: string;
  abstract modeltype: "predict" | "classify" | "regress";
  abstract setup(): Promise<void>;
}

export abstract class MLPredictProxyClass extends MLProxyClass {
    modeltype: "predict"
    
}
