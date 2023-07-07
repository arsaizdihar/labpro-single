import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http/http-exception.filter';
import { ResponseInterceptor } from './http/response-interceptor';
import { ZodValidationExceptionFilter } from './http/zod-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ZodValidationExceptionFilter(),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors({ origin: '*' });
  await app.listen(3000);
}
bootstrap();
