import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DrizzleType } from '../drizzle.provider';
import { users } from '../schema';

dotenv.config();
export async function runSeed(db?: DrizzleType) {
  let client: postgres.Sql | undefined;
  if (!db) {
    client = postgres(process.env.DATABASE_URL);
    db = drizzle(client);
  }
  await db.delete(users);
  await db.insert(users).values({
    name: 'Admin',
    username: 'admin',
    password: bcrypt.hashSync('admin1234'),
  });
  if (client) {
    await client.end();
  }
}
if (typeof require !== 'undefined' && require.main === module) {
  runSeed();
}
