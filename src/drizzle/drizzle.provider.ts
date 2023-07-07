import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export interface DrizzleType extends PostgresJsDatabase<typeof schema> {
  end?: () => Promise<void>;
}

declare global {
  // eslint-disable-next-line no-var
  var _client: postgres.Sql | undefined;
}

export const Drizzle = Symbol('Drizzle');

export const DrizzleProvider: FactoryProvider<DrizzleType> = {
  provide: Drizzle,
  inject: [ConfigService],
  useFactory(config: ConfigService) {
    const client = globalThis._client ?? postgres(config.get('DATABASE_URL'));
    globalThis._client = client;

    const db: DrizzleType = drizzle(client, { schema });
    db.end = async () => {
      await client.end();
      globalThis._client = undefined;
    };
    return db;
  },
};
