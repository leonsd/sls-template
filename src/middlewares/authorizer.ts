import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { verify } from 'jsonwebtoken';

import { response } from '../utils/responses';

const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET;

  return new Promise((resolve, reject) => {
    verify(token, secret, (err) => {
      if (err) {
        reject(err);
      }

      resolve(true);
    });
  });
};

export const authorizer = () => {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request) => {
    const token = request.event.headers.token;

    if (!token) {
      return response.error.forbidden({
        message: 'Forbidden access',
      });
    }

    try {
      await verifyToken(token);
    } catch (error) {
      return response.error.forbidden({
        message: error.message,
      });
    }
  };

  return { before };
};
