import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';
dotenv.config();

export default {
  driver: 'pg',
  schema: './src/drizzle/schema.ts',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  out: './src/drizzle/migrations',
} satisfies Config;
