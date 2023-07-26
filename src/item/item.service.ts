import { Drizzle, DrizzleType } from '@/drizzle/drizzle.provider';
import { items } from '@/drizzle/schema';
import { HttpExceptionData } from '@/http/http-exception-data';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { and, eq, ilike, or } from 'drizzle-orm';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsDto } from './dto/get-items.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(@Inject(Drizzle) private readonly db: DrizzleType) {}

  async create(data: CreateItemDto) {
    return await this.db.insert(items).values(data).returning();
  }

  findAll(query: GetItemsDto) {
    let dbQuery = this.db
      .select()
      .from(items)
      .where(
        and(
          query.q
            ? or(
                ilike(items.nama, `%${query.q}%`),
                ilike(items.kode, `%${query.q}%`),
              )
            : undefined,
          query.perusahaan
            ? eq(items.perusahaan_id, query.perusahaan)
            : undefined,
        ),
      );
    if (query.page && query.limit) {
      dbQuery = dbQuery
        .limit(query.limit)
        .offset((query.page - 1) * query.limit);
    }
    return dbQuery;
  }

  async findOne(id: string) {
    const [item] = await this.db.select().from(items).where(eq(items.id, id));
    if (!item) {
      throw new HttpExceptionData('Item not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async update(id: string, data: UpdateItemDto) {
    const [result] = await this.db
      .update(items)
      .set(data)
      .where(eq(items.id, id))
      .returning();

    if (!result) {
      throw new HttpExceptionData('Item not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async remove(id: string) {
    const [result] = await this.db
      .delete(items)
      .where(eq(items.id, id))
      .returning();

    if (!result) {
      throw new HttpExceptionData('Item not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async buy(id: string, total: number) {
    const [item] = await this.db.select().from(items).where(eq(items.id, id));
    if (!item) {
      throw new HttpExceptionData('Item not found', HttpStatus.NOT_FOUND);
    }
    if (item.stok < total) {
      throw new HttpExceptionData(
        'Not enough stock',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await this.db
      .update(items)
      .set({ stok: item.stok - total })
      .where(eq(items.id, id))
      .returning();
  }
}
