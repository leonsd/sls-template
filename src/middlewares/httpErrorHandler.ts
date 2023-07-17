import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import Exception from '../exceptions/Exception';
import InternalException from '../exceptions/InternalException';

const normalizeError = (error: Error | null) => {
  if (error instanceof Exception) {
    return error;
  }

  return new InternalException();
};

export const httpErrorHandler = () => {
  const onError: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request) => {
    const { error } = request;
    const exception = normalizeError(error);

    request.response = {
      body: JSON.stringify(exception.getBody()),
      headers: { 'Content-Type': 'application/json' },
      statusCode: exception.getStatusCode(),
    };
  };

  return { onError };
};
