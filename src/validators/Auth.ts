import Joi from 'joi';

const authEventBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const authEventSchema = Joi.object({
  body: authEventBodySchema,
});
