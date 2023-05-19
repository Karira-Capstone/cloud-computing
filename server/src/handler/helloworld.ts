import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { db } from '../prisma';

export const hellowordHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  const pengguna_rajin = await db.user.findMany({
    where: {
      notification: {
        every: {
          is_seen: true,
        },
      },
    },
  }); // fetch all user whose notification has been seen
  return `Hello, ada ${pengguna_rajin.length} pengguna rajin`;
};
