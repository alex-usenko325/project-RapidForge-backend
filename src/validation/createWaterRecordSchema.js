import Joi from 'joi';

export const createWaterRecordSchema = Joi.object({
  date: Joi.string().required().messages({
    'any.required': 'Date is required',
    'date.base': 'Date must be a string',
  }),
  time: Joi.string().required().messages({
    'any.required': 'Time is required',
    'string.base': 'Time must be a string',
  }),
  volume: Joi.number().positive().required().messages({
    'any.required': 'Volume is required',
    'number.base': 'Volume must be a number',
    'number.positive': 'Volume must be a positive number',
  }),
});
