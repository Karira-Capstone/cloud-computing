import { db } from '..';

export const cleanupDatabase = () => {
  const propertyNames = Object.getOwnPropertyNames(db);
  const modelNames = propertyNames.filter((propertyName) => !propertyName.startsWith('_'));
  console.log(modelNames);
  return Promise.all(modelNames.map((model) => db[model].deleteMany()));
};
