import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { HttpExceptionData } from './http-exception-data';

@Catch(HttpExceptionData)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpExceptionData, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      status: 'error',
      message: exception.message,
      data: exception.data,
    });
  }
}
