import { HttpStatus } from '../enums/httpStatus';
import Exception from './Exception';

export default class NotFoundException extends Exception {
  constructor(message = 'Resource not found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
