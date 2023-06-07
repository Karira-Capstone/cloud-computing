import { PUBSUB_CONFIG, createSubscription, pubSubClient } from "./google/pubsub";
import { projectCreatedHandler } from "./handler/project-created";
import { serviceCreatedHandler } from "./handler/service-created";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.post("/api/project", async (req, res) => {
  try {
    await projectCreatedHandler(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/api/service", async (req, res) => {
  try {
    await serviceCreatedHandler(req.body);
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
