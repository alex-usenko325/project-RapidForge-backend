import createHttpError from 'http-errors';
import {
  addWaterRecord,
  getWaterToday,
  updateWaterRecord,
} from '../services/water.js';

export const updateWaterRecordController = async (req, res) => {
  const userId = req.user._id;
  const { id: recordId } = req.params;
  const updateData = req.body;

  if (!updateData.date && !updateData.volume) {
    throw createHttpError(
      400,
      'At least one field (date or volume) is required for update',
    );
  }

  const updatedRecord = await updateWaterRecord(userId, recordId, updateData);

  res.json({
    status: 200,
    message: 'Successfully updated water record!',
    data: updatedRecord,
  });
};

export const addWaterRecordController = async (req, res) => {
  const userId = req.user._id;
  const { date, volume } = req.body;

  const record = await addWaterRecord({ userId, date, volume });

  res.status(201).json({
    status: 201,
    message: 'Water consumption record added successfully!',
    data: record,
  });
};

export const getWaterTodayController = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw createHttpError(401, 'Unauthorized: User not found');
  }
  const waterData = await getWaterToday(userId);

  if (!waterData) {
    return res.json({
      status: 200,
      message: 'No water consumption data found for today',
      data: {},
    });
  }

  res.json({
    status: 200,
    message: 'Water consumption data retrieved successfully',
    data: waterData,
  });
};
