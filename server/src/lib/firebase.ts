import admin, { ServiceAccount } from 'firebase-admin';

import serviceAccount from '../serviceAccounts/firebase-admin.json';

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
