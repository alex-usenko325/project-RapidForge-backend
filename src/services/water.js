import { waterCollection } from '../db/models/Water.js';
import createHttpError from 'http-errors';

export const addWaterRecord = async ({ userId, date, time, volume }) => {
  const record = await waterCollection.create({ userId, date, time, volume });
  return record;
};

export const updateWaterRecord = async (userId, recordId, updateData) => {
  // if (updateData.data || updateData.time) {
  //   throw createHttpError(400, 'Updating date or time is not allowed');
  // }
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

export const deleteWaterRecord = async (userId, recordId) => {
  const deletedRecord = await waterCollection.findOneAndDelete({
    _id: recordId,
    userId: userId,
  });

  return deletedRecord;
};
