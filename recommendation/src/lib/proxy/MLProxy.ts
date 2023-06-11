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
    this.vocab = await this.readVocabFromFile(this.modelname);
  }

  private async readVocabFromFile(fileName: string): Promise<string[]> {
    let vocab = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(`${__dirname}/predict/files/${this.modelname}.txt`),
      crlfDelay: Infinity,
    });
    rl.on("line", (line) => {
      vocab.push(line);
    });
    await events.once(rl, "close");
    return vocab;
  }

  protected async fetch(data: string): Promise<AxiosResponse<any, any>> {
    try {
      const result = await AxiosClient.post(`${this.modelname}:predict`, {
        instances: [
          {
            [this.input_key]: [data],
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
    const numbers = predictions[0] as number[];
    numbers.splice(0, 1);
    const _5highest = [0, 0, 0, 0, 0];
    const _5highestVocab = ["", "", "", "", ""];
    console.log(this.modelname);
    if (this.vocab.length != numbers.length) {
      console.log("VOCAB LENGTH AND PREDICTIONS DIFFERENT: " + this.vocab.length + " vs " + numbers.length);
    }
    for (let i = 0; i < 5; i++) {
      const _highest = numbers.reduce((a, b) => Math.max(a, b), -Infinity);
      const _removed_id = numbers.indexOf(_highest);
      numbers.splice(_removed_id, 1);
      _5highest[i] = _highest;
      _5highestVocab[i] = this.vocab[_removed_id];
      console.log(_highest, this.vocab[_removed_id]);
    }
    return _5highestVocab;
  }
  async predict(text: string) {
    const prediction = await this.fetch(text);
    const _5highestVocab = this.extract5Highest(prediction.data);
    return _5highestVocab;
  }
}
