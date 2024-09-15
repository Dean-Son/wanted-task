import { HttpException, HttpStatus } from '@nestjs/common';

export class NoContentException extends HttpException {
  constructor(message = 'No Content') {
    super(message, HttpStatus.NO_CONTENT);
  }
}
