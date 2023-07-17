import { HttpStatus } from '../enums/httpStatus';
import Exception from './Exception';

export default class UnauthorizedException extends Exception {
  constructor(message = 'Unauthorized') {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
