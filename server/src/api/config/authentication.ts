import Hapi, { Server } from '@hapi/hapi';
import jwt, { HapiJwt } from '@hapi/jwt';
import { User } from '@prisma/client';
import dotenv from 'dotenv'
dotenv.config()
export const jwt_user_strategy = {
  keys: {
    key: process.env.JWT_SECRET_KEY,
    algorithms: ['HS512'],
  },
  verify: {
    aud: 'karira',
    iss: 'karira',
    sub: 'user',
    nbf: false,
    exp: false,
  },
  validate: (
    artifacts: HapiJwt.Artifacts<Hapi.ReqRefDefaults & HapiJwt.JwtRefs>,
    request: Hapi.Request<Hapi.ReqRefDefaults & HapiJwt.JwtRefs>,
    h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults & HapiJwt.JwtRefs>,
  ) => {
    const { user } = artifacts.decoded.payload;
    return {
      isValid: true,
      credentials: {
        user,
        scope: [user.role],
      },
    };
  },
}

export const createToken = (user: User): String => {
    return jwt.token.generate(
      {
        aud: 'karira',
        iss: 'karira',
        sub: 'user',
        user: {
          id: user.id,
          name: user.full_name,
          role: user.role,
          email: user.email,
          onboarded: user.onboarded,
        },
      },
      {
        key: process.env.JWT_SECRET_KEY,
        algorithm: 'HS512',
      },
      {
        ttlSec: 60 * 60 * 24 * 7 * 4, // 28 days
      },
    );
  };