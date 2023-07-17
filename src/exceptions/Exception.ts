import IErrorResponse from '../interfaces/ErrorResponse';

export default class Exception extends Error {
  protected statusCode: number;
  protected body: IErrorResponse;

  constructor(status: number, message: string) {
    super(message);
    this.body = { message };
    this.statusCode = status;
  }

  getStatusCode = () => {
    return this.statusCode;
  };

  getBody = () => {
    return this.body;
  };
}
