import { Global, Module } from '@nestjs/common';
import { Drizzle, DrizzleProvider } from './drizzle.provider';

@Global()
@Module({
  providers: [DrizzleProvider],
  exports: [Drizzle],
})
export class DrizzleModule {}
