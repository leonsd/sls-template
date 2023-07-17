import middy from '@middy/core';
import { SQSEvent } from 'aws-lambda';

import InternalException from '../exceptions/InternalException';

export const sqsBodyParser = () => {
  const before: middy.MiddlewareFn<SQSEvent> = async (request) => {
    const recordsParsed = request.event.Records.map((record) => {
      try {
        if (typeof record.body !== 'object') {
          record.body = JSON.parse(record.body);
        }
        return record;
      } catch (error) {
        throw new InternalException();
      }
    });

    request.event.Records = recordsParsed;
  };

  return { before };
};
