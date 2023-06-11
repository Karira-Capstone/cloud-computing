import { projectCreatedHandler } from "./handler/events/project-created";
import { serviceCreatedHandler } from "./handler/events/service-created";
import express, { response } from "express";
import cors from "cors";
import {
  MLProxyPredictFindProject,
  MLProxyPredictProjectBudget,
  MLProxyPredictProjectTag,
  MLProxyPredictFindService,
  MLProxyPredictServiceBudget,
  MLProxyPredictServiceTags,
} from "./lib/proxy";
import { predictProjectBudgetHandler } from "./handler/predict/predict-project-budget";
import { predictServiceBudgetHandler } from "./handler/predict/predict-service-budget";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/recommendation/hello", (req, res) => {
  res.send("Hello World");
});

app.post("/api/recommendation/project", projectCreatedHandler);

app.post("/api/recommendation/service", serviceCreatedHandler);

app.post("/api/recommendation/project-budget", predictProjectBudgetHandler);
app.post("/api/recommendation/service-budget", predictServiceBudgetHandler);

const init = async () => {
  app.listen(8000, async () => {
    console.log("Open on 8000");
  });
  await Promise.all([
    MLProxyPredictFindProject.setup(),
    MLProxyPredictProjectBudget.setup(),
    MLProxyPredictProjectTag.setup(),
    MLProxyPredictFindService.setup(),
    MLProxyPredictServiceBudget.setup(),
    MLProxyPredictServiceTags.setup(),
  ]);
};

init();
