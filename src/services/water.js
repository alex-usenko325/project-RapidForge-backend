import { waterCollection } from '../db/models/Water.js';

export const addWaterRecord = async ({ userId, date, volume }) => {
  const record = await waterCollection.create({ userId, date, volume });
  return record;
};
