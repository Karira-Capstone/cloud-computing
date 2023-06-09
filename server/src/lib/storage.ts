import serviceAccount from '../serviceAccounts/cloud-storage-admin.json';
import { Storage } from '@google-cloud/storage';
export const storageAdmin = new Storage({
  credentials: serviceAccount,
});
