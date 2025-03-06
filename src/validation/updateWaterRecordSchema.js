import Joi from 'joi';

export const updateWaterRecordSchema = Joi.object({
  date: Joi.date().optional().messages({
    'date.base': 'Date must be a valid date format',
  }),
  volume: Joi.number().positive().optional().messages({
    'number.base': 'Volume must be a number',
    'number.positive': 'Volume must be a positive number',
  }),
});
