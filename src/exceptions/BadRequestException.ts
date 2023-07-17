import { HttpStatus } from '../enums/httpStatus';
import Exception from './Exception';

export default class BadRequestException extends Exception {
  constructor(message = 'Invalid information') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
