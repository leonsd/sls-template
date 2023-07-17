import { HttpStatus } from '../enums/httpStatus';
import Exception from './Exception';

export default class ForbiddenException extends Exception {
  constructor(message = 'Forbidden') {
    super(HttpStatus.FORBIDDEN, message);
  }
}
