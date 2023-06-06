import Boom from '@hapi/boom';
import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { firebaseAdmin } from '../../google/firebase';
import { getAuth } from 'firebase-admin/auth';
import { db } from '../../prisma/index';
import { createToken } from '../config/authentication';

export const DEFAULT_IMAGE =
  'https://static1.personality-database.com/profile_images/cc36f78d9922466ca1123292660e7168.png';

export const authHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const idToken = request.payload['idToken'];
    const decodedIdToken = await getAuth(firebaseAdmin).verifyIdToken(idToken);
    const { email, name, picture } = decodedIdToken;
    let user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      user = await db.user.create({
        data: {
          email: email,
          full_name: name,
          last_login: new Date(),
          picture: picture ?? DEFAULT_IMAGE,
        },
      });
    }
    return {
      token: createToken(user),
      user: user,
    };
  } catch (error) {
    request.log('error', error);
    throw Boom.badRequest('Authentication Failed!');
  }
};
