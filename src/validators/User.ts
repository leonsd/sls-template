import Joi from 'joi';

/* Password conditions:
  Min 1 uppercase letter.
  Min 1 lowercase letter.
  Min 1 special character.
  Min 1 number.
  Min 8 characters.
  Max 16 characters.
*/
// eslint-disable-next-line no-useless-escape
const passwordPattern = new RegExp(
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,16}$'
);
const passwordError = new Error('Password does not match minimum requirements');

const createEventBodySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(passwordPattern)
    .required()
    .error(passwordError),
});

const showEventPathParameterSchema = Joi.object({
  id: Joi.number().required(),
});

const confirmEventPathParameterSchema = Joi.object({
  email: Joi.string().email().required(),
});

const confirmEventBodySchema = Joi.object({
  code: Joi.string().length(6).required(),
});

export const createEventSchema = Joi.object({
  body: createEventBodySchema,
});

export const showEventSchema = Joi.object({
  pathParameters: showEventPathParameterSchema,
});

export const confirmEventSchema = Joi.object({
  pathParameters: confirmEventPathParameterSchema,
  body: confirmEventBodySchema,
});
