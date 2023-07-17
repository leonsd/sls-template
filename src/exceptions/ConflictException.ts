import { HttpStatus } from '../enums/httpStatus';
import Exception from './Exception';

export default class ConflictException extends Exception {
  constructor(message = 'There was a conflict on your request') {
    super(HttpStatus.CONFLICT, message);
  }
}
