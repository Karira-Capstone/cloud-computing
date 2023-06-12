import fs from "fs";
import events from "events";
import readline from "readline";
import axios, { AxiosResponse } from "axios";

export abstract class MLProxyClass {
  baseUrl = "http:///karira.id/v1/models/";
  modelname: string;
  modeltype: string;
  abstract setup(): Promise<void>;
}

const AxiosClient = axios.create({
  baseURL: "https://karira.id/v1/models/",
});

export abstract class MLPredictProxyClass extends MLProxyClass {
  abstract modelname: string;
  abstract input_key: string;
  modeltype = "predict";
  private vocab: string[] = [];
  async setup(): Promise<void> {
    let vocab = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(`${__dirname}/predict/files/${this.modelname}.txt`),
      crlfDelay: Infinity,
    });
    rl.on("line", (line) => {
      vocab.push(line);
    });
    await events.once(rl, "close");
    this.vocab = vocab;
  }

  protected async fetch(data: string): Promise<AxiosResponse<any, any>> {
    try {
      console.log(data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").slice(0, 500));
      const result = await AxiosClient.post(`${this.modelname}:predict`, {
        instances: [
          {
            [this.input_key]: [data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")],
          },
        ],
      });
      return result;
    } catch (error) {
      console.error(error.message);
    }
  }

  protected extract5Highest(data: any) {
    const predictions = data.predictions;
    let numbers = predictions[0] as number[];
    const _5highest = [0, 0, 0, 0, 0];
    const _5highestVocab = ["", "", "", "", ""];
    console.log(this.modelname);
    for (let i = 0; i < 5; i++) {
      const _highest = numbers.reduce((a, b) => (a > b ? a : b), -Infinity);
      const _removed_id = numbers.indexOf(_highest);
      numbers[_removed_id] = -1;
      _5highest[i] = _highest;
      _5highestVocab[i] = this.vocab[_removed_id];
      console.log(_highest, this.vocab[_removed_id]);
    }
    const _mostProbable = _5highest[0];
    if (_mostProbable * 1000 < 1) {
      // jika lebih kecil dari 0.001, return ["Others"]
      return ["Others"];
    }
    return _5highestVocab;
  }
  async predict(text: string) {
    const prediction = await this.fetch(text);
    const _5highestVocab = this.extract5Highest(prediction.data);
    return _5highestVocab;
  }
}
