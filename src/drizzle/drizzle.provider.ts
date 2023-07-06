import { FactoryProvider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const Drizzle = Symbol('Drizzle');
export type DrizzleType = PostgresJsDatabase<typeof schema>;

export const DrizzleProvider: FactoryProvider<DrizzleType> = {
  provide: Drizzle,
  inject: [ConfigModule],
  useFactory(config: ConfigService) {
    const client = postgres(config.get('DATABASE_URL'));
    const db = drizzle(client, { schema });
    return db;
  },
};
