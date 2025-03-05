import Joi from 'joi';

export const createWaterRecordSchema = Joi.object({
  date: Joi.date().required().messages({
    'any.required': 'Date is required',
    'date.base': 'Date must be a valid date format',
  }),
  volume: Joi.number().positive().required().messages({
    'any.required': 'Volume is required',
    'number.base': 'Volume must be a number',
    'number.positive': 'Volume must be a positive number',
  }),
});
