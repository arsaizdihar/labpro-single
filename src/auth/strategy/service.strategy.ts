import { HttpExceptionData } from '@/http/http-exception-data';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class ServiceStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'service',
) {
  constructor(config: ConfigService) {
    super(
      {
        header: 'Authorization',
        prefix: 'Bearer ',
      },
      true,
      (apiKey: string, done: (err: Error | null, user?: object) => void) => {
        if (apiKey === config.get('SERVICE_SECRET')) {
          done(null, {});
        } else {
          done(new HttpExceptionData('Unauthorized', 401));
        }
      },
    );
  }
}
