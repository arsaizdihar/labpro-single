import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
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
  const config = new DocumentBuilder()
    .setTitle('OHL Single')
    .setDescription('Untuk keperluan seleksi asisten labpro')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT ?? 3000);
}
patchNestJsSwagger();
bootstrap();
