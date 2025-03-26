import { waterCollection } from '../db/models/Water.js';
import createHttpError from 'http-errors';
export const addWaterRecord = async ({ userId, date, time, volume }) => {
  const record = await waterCollection.create({ userId, date, time, volume });
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

export const getWaterToday = async (userId, date) => {
  return await waterCollection.find({
    userId,
    date: date,
  });
};

export const getWaterForMonth = async (userId, year, month) => {
  const mm = month.toString().padStart(2, '0');
  const monthPrefix = `${year}-${mm}`;
  return await waterCollection.find({
    userId,
    date: { $regex: `^${monthPrefix}` },
  });
};

export const deleteWaterRecord = async (userId, recordId) => {
  const deletedRecord = await waterCollection.findOneAndDelete({
    _id: recordId,
    userId: userId,
  });

  return deletedRecord;
};
