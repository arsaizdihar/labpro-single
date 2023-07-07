import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { justThrow } from '../../utils';
import { DrizzleType } from '../drizzle.provider';
import { companies, items, users } from '../schema';

dotenv.config();
export async function runSeed(db?: DrizzleType) {
  let client: postgres.Sql | undefined;
  if (!db) {
    client = postgres(
      process.env.DATABASE_URL ?? justThrow('DATABASE_URL not found'),
    );
    db = drizzle(client);
  }
  await db.transaction(async (tx) => {
    await tx.delete(users);
    await tx.delete(items);
    await tx.delete(companies);
    await tx.insert(users).values({
      name: 'Admin',
      username: 'admin',
      password: bcrypt.hashSync('admin1234'),
    });

    const [comp] = await tx
      .insert(companies)
      .values({
        nama: 'PT. Maju Mundur',
        alamat: 'Jl. Maju Mundur No. 1',
        kode: 'MM',
        no_telp: '081234567890',
      })
      .returning();

    await tx.insert(items).values({
      harga: 10000,
      kode: 'MM-001',
      nama: 'Buku Tulis',
      perusahaan_id: comp.id,
      stok: 100,
    });
  });
  if (client) {
    await client.end();
  }
}
if (typeof require !== 'undefined' && require.main === module) {
  runSeed();
}
