import { HttpException } from '@nestjs/common';

export class HttpExceptionData<T = unknown> extends HttpException {
  constructor(
    message: string,
    status: number,
    public data?: Record<string, T>,
  ) {
    super(message, status);
  }
}
