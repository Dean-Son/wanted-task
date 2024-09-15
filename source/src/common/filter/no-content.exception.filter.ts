import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { NoContentException } from '../exceptions/no-content.exception';

@Catch(NoContentException, EntityNotFoundError)
export class NoContentExceptionFilter implements ExceptionFilter {
  catch(exception: NoContentException | EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { message } = exception;

    const data = {
      code: HttpStatus.NO_CONTENT,
      message: 'No Content',
      data: {},
    };

    response.status(HttpStatus.OK).json(data);
  }
}
