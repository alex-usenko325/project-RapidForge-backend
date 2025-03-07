import { waterCollection } from '../db/models/Water.js';
import createHttpError from 'http-errors';

export const addWaterRecord = async ({ userId, date, volume }) => {
  const record = await waterCollection.create({ userId, date, volume });
  return record;
};

export const updateWaterRecord = async (userId, recordId, updateData) => {
  const updatedRecord = await waterCollection.findOneAndUpdate(
    { _id: recordId, userId },
    updateData,
    { new: true },
  );

  if (!updatedRecord) {
    throw createHttpError(404, 'Water record not found');
  }

  return updatedRecord;
};

export const getWaterToday = async (userId) => {
  const nowUTC = new Date();
  const startDay = new Date(
    Date.UTC(
      nowUTC.getUTCFullYear(),
      nowUTC.getUTCMonth(),
      nowUTC.getUTCDate(),
      0,
      0,
      0,
    ),
  );
  const endDay = new Date(
    Date.UTC(
      nowUTC.getUTCFullYear(),
      nowUTC.getUTCMonth(),
      nowUTC.getUTCDate(),
      23,
      59,
      59,
    ),
  );
  return await waterCollection.findOne({
    userId,
    date: { $gte: startDay, $lte: endDay },
  });
};
