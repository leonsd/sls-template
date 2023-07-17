import { HttpStatus } from '../../enums/httpStatus';
import IErrorResponse from '../../interfaces/ErrorResponse';

const headers = {
  'content-type': 'application/json',
};

export const response = {
  success: {
    ok: <T>(body: T) => {
      return {
        statusCode: HttpStatus.OK,
        headers,
        body: JSON.stringify(body),
      };
    },
    created: <T>(body: T) => {
      return {
        statusCode: HttpStatus.CREATED,
        headers,
        body: JSON.stringify(body),
      };
    },
  },
  error: {
    badRequest: (body: IErrorResponse) => {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        headers,
        body: JSON.stringify(body),
      };
    },
    forbidden: (body: IErrorResponse) => {
      return {
        statusCode: HttpStatus.FORBIDDEN,
        headers,
        body: JSON.stringify(body),
      };
    },
    notFound: (body: IErrorResponse) => {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        headers,
        body: JSON.stringify(body),
      };
    },
    conflict: (body: IErrorResponse) => {
      return {
        statusCode: HttpStatus.CONFLICT,
        headers,
        body: JSON.stringify(body),
      };
    },
    internal: (body: IErrorResponse) => {
      return {
        statusCode: HttpStatus.INTERNAL,
        headers,
        body: JSON.stringify(body),
      };
    },
  },
};
