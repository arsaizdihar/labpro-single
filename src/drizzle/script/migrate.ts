import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { justThrow } from '../../utils';

dotenv.config();
async function runMigrate() {
  const migrationClient = postgres(
    process.env.DATABASE_URL ?? justThrow('DATABASE_URL not found'),
    { max: 1 },
  );
  await migrate(drizzle(migrationClient), {
    migrationsFolder: './src/drizzle/migrations',
  });
  await migrationClient.end();
}
runMigrate();
