import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi';
import { storageAdmin } from '../../../lib/storage';
import { User } from '@prisma/client';
import Boom from '@hapi/boom';

const uploadFile = (file: any, user: User) => {
  return new Promise((resolve, reject) => {
    const fileName = file.hapi.filename;
    const newFilePath = `${user.id}/${new Date().getTime()}_${fileName.replace(/ /g, '_')}`;
    const uploadWriteStream = storageAdmin.bucket('karira').file(newFilePath).createWriteStream();
    file.pipe(uploadWriteStream);
    uploadWriteStream.on('error', (err) => {
      console.error('Ada error');
      reject(err);
    });
    file.on('end', (err) => {
      console.log('Resolved file : ' + fileName);
      resolve(`https://storage.googleapis.com/karira/${newFilePath}`);
    });
  });
};

export const uploadImageHandler = async (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
) => {
  try {
    const user = request.pre.user as User;
    const data = request.payload as any;
    if (Array.isArray(data.file)) {
      const promises = data.file.map((file) => {
        return uploadFile(file, user);
      });
      return await Promise.all(promises);
    }
    return [await uploadFile(data.file, user)];
  } catch (error) {
    console.log('Ada error cuk');
    if (Boom.isBoom(error)) {
      throw error;
    }
    request.log('error', error); // unexpected error
    throw Boom.badRequest('');
  }
};
