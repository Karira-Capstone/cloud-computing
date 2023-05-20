import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { db } from '../prisma';
import { firebaseAdmin } from '../firebase/firebase';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { getAuth } from 'firebase-admin/auth';
import { error } from 'console';
const CLIENT_ID = process.env.CLIENT_ID;
const default_image =
  'https://static1.personality-database.com/profile_images/cc36f78d9922466ca1123292660e7168.png';

export const authHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
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
        picture: picture ?? default_image,
      },
    });
  }

  return `hai`;
};
