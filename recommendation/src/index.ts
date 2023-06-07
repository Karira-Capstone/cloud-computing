import { PUBSUB_CONFIG, createSubscription, pubSubClient } from "./google/pubsub";
import { projectCreatedHandler } from "./handler/project-created";
import { serviceCreatedHandler } from "./handler/service-created";
import express from "express";
import cors from "cors"
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/recommendation/hello", (req, res)=>{
  return "Hello, world!";
})

app.post("/api/recommendation/project", async (req, res) => {
  await projectCreatedHandler(req.body);
});

app.post("/api/recommendation/project", async (req, res) => {
  await serviceCreatedHandler(req.body);
});

const init = async () => {
  app.listen(8000, async () => {
    console.log("Open on 8000");
  });
  // const projectcreatedSubscription = pubSubClient.subscription(PUBSUB_CONFIG.SUBSCRIPTION.PROJECT_CREATED);
  // projectcreatedSubscription.on('message', projectCreatedHandler);

  // const serviceCreatedSubscription = pubSubClient.subscription(PUBSUB_CONFIG.SUBSCRIPTION.SERVICE_CREATED);
  // serviceCreatedSubscription.on('message', serviceCreatedHandler);
  // console.log("Started")
};

init();
