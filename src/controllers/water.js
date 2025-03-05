import { addWaterRecord } from '../services/water.js';

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
