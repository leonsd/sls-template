import middy from '@middy/core';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';

import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import { authorizer } from './middlewares/authorizer';
import { databaseConnection } from './middlewares/databaseConnection';
import { httpErrorHandler } from './middlewares/httpErrorHandler';
import { validator } from './middlewares/validator';
import { authEventSchema } from './validators/Auth';
import {
  createEventSchema as createUserEventSchema,
  showEventSchema as ShowUserEventSchema,
  confirmEventSchema as confirmUserEventSchema,
} from './validators/User';

import { sendConfirmationEmail } from './handlers/sendConfirmationEmail';
import { sqsBodyParser } from './middlewares/sqsBodyParser';

const authController = AuthController.getInstance();
const userController = UserController.getInstance();

// Http
export const authentication = middy(authController.authentication)
  .use(httpEventNormalizer())
  .use(httpJsonBodyParser())
  .use(validator(authEventSchema))
  .use(databaseConnection())
  .use(httpErrorHandler());

export const createUser = middy(userController.create)
  .use(httpEventNormalizer())
  .use(httpJsonBodyParser())
  .use(validator(createUserEventSchema))
  .use(databaseConnection())
  .use(httpErrorHandler());

export const showUser = middy(userController.show)
  .use(httpEventNormalizer())
  .use(authorizer())
  .use(validator(ShowUserEventSchema))
  .use(databaseConnection())
  .use(httpErrorHandler());

export const confirmUser = middy(userController.confirm)
  .use(httpEventNormalizer())
  .use(httpJsonBodyParser())
  .use(validator(confirmUserEventSchema))
  .use(databaseConnection())
  .use(httpErrorHandler());

// Workers
export const sendConfirmationEmailWorker = middy(sendConfirmationEmail)
  .use(sqsBodyParser())
  .use(databaseConnection());
