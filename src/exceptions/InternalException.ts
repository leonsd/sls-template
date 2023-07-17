import { HttpStatus } from '../enums/httpStatus';
import Exception from './Exception';

export default class InternalException extends Exception {
  constructor(message = 'Internal server error') {
    super(HttpStatus.INTERNAL, message);
  }
}
