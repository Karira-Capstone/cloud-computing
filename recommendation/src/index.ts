import { PUBSUB_CONFIG, createSubscription, pubSubClient } from "./google/pubsub";
import { projectCreatedHandler } from "./google/pubsub/handler/project-created";
import { serviceCreatedHandler } from "./google/pubsub/handler/service-created";

const init = async () => {
  const projectcreatedSubscription = pubSubClient.subscription(PUBSUB_CONFIG.SUBSCRIPTION.PROJECT_CREATED);
  projectcreatedSubscription.on('message', projectCreatedHandler);

  const serviceCreatedSubscription = pubSubClient.subscription(PUBSUB_CONFIG.SUBSCRIPTION.SERVICE_CREATED);
  serviceCreatedSubscription.on('message', serviceCreatedHandler);
};

init();
