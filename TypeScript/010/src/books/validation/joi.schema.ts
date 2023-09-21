import * as Joi from 'joi';

export const createSchema = Joi.object().keys({
  title: Joi.string().min(2).required(),
  description: Joi.string().min(2).optional(),
  authors: Joi.string().min(2).optional(),
  favorite: Joi.string().min(2).optional(),
  fileName: Joi.string().optional(),
});
