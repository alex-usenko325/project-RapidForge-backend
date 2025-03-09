import Joi from 'joi';

export const updateWaterRecordSchema = Joi.object({
  date: Joi.string().optional().messages({
    'string.base': 'Date must be a string',
  }),
  time: Joi.string().optional().messages({
    'string.base': 'Time must be a string',
  }),
  volume: Joi.number().positive().optional().messages({
    'number.base': 'Volume must be a number',
    'number.positive': 'Volume must be a positive number',
  }),
}).min(1); 
