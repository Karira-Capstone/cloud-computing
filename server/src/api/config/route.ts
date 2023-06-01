import { USER_ROLE } from "@prisma/client";
import { getUser } from "../middleware";
import { getClient } from "../middleware/getClient";
import { getWorker } from "../middleware/getWorker";

export const unauthenticatedRouteConfig: any= {
  auth: false,
}

export const workerRouteConfig = {
  auth: {
    strategy: 'jwt_user',
    access: {
      scope: [USER_ROLE.WORKER],
    },
  },
  pre: [
    {
      method: getWorker,
      assign: "user"
    },
  ],
};
export const clientRouteConfig = {
  auth: {
    strategy: 'jwt_user',
    access: {
      scope: [USER_ROLE.CLIENT],
    },
  },
  pre: [
    {
      method: getClient,
      assign: "user"
    },
  ],
};
export const authenticatedRouteConfig = {
  auth: {
    strategy: 'jwt_user',
    access:{
        scope: [USER_ROLE.CLIENT, USER_ROLE.WORKER, USER_ROLE.UNDEFINED],
    }
  },
  pre: [
    {
      method: getUser,
      assign: "user"
    },
  ],
};
