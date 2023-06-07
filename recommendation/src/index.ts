import { PUBSUB_CONFIG, createSubscription, pubSubClient } from "./google/pubsub";
import { projectCreatedHandler } from "./handler/project-created";
import { serviceCreatedHandler } from "./handler/service-created";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/recommendation/hello", (req, res) => {
  res.send("Hello World");
});

app.post("/api/recommendation/project", async (req, res) => {
  try {
    const data = JSON.parse(atob(req.body.message.data))
    await projectCreatedHandler(data);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/api/recommendation/service", async (req, res) => {
  try {
    const data = JSON.parse(atob(req.body.message.data))
    await serviceCreatedHandler(data);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

const init = async () => {
  app.listen(8000, async () => {
    console.log("Open on 8000");
  });
};

init();
