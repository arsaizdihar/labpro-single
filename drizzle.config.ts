import { justThrow } from '@/utils';
import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';
dotenv.config();

export default {
  driver: 'pg',
  schema: './src/drizzle/schema.ts',
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ?? justThrow('DATABASE_URL not found'),
  },
  out: './src/drizzle/migrations',
} satisfies Config;
