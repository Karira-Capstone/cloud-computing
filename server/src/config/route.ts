import { USER_ROLE } from "@prisma/client";

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
};
export const clientRouteConfig = {
  auth: {
    strategy: 'jwt_user',
    access: {
      scope: [USER_ROLE.CLIENT],
    },
  },
};
export const authenticatedRouteConfig = {
  auth: {
    strategy: 'jwt_user',
    access:{
        scope: [USER_ROLE.CLIENT, USER_ROLE.WORKER, USER_ROLE.UNDEFINED],
    }
  },
};
