import { PubSub } from '@google-cloud/pubsub';
import serviceAccount from '../../serviceAccounts/pubsub-publisher.json';

export const pubSubClient = new PubSub({
  credentials: serviceAccount,
});

export const PUBSUB_CONFIG = {
  SUBSCRIPTION: {
    PROJECT_CREATED: 'projects/karira-project/subscriptions/project-created-sub',
    SERVICE_CREATED: 'projects/karira-project/subscriptions/service-created-sub',
  },
  TOPIC: {
    PROJECT_CREATED: 'projects/karira-project/topics/project-created',
    SERVICE_CREATED: 'projects/karira-project/topics/service-created',
  },
};