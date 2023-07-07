import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    username: text('username').notNull(),
    name: text('name').notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (users) =>
    ({
      usernameIndex: uniqueIndex('username_index').on(users.username),
    } as const),
);

export const companies = pgTable('companies', {
  id: uuid('id').defaultRandom().primaryKey(),
  nama: text('name').notNull(),
  alamat: text('address').notNull(),
  no_telp: text('phone_number').notNull(),
  kode: text('code').notNull(),
});

export const companiesRelation = relations(companies, ({ many }) => ({
  items: many(items),
}));

export const items = pgTable('items', {
  id: uuid('id').defaultRandom().primaryKey(),
  nama: text('name').notNull(),
  harga: integer('price').notNull(),
  stok: integer('stock').notNull(),
  kode: text('code').notNull(),
  perusahaan_id: uuid('company_id')
    .notNull()
    .references(() => companies.id),
});

export const itemsRelations = relations(items, ({ one }) => ({
  perusahaan: one(companies, {
    fields: [items.perusahaan_id],
    references: [companies.id],
  }),
}));
