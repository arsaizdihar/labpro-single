import { Drizzle, DrizzleType } from '@/drizzle/drizzle.provider';
import { items } from '@/drizzle/schema';
import { HttpExceptionData } from '@/http/http-exception-data';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(@Inject(Drizzle) private readonly db: DrizzleType) {}

  async create(data: CreateItemDto) {
    return await this.db
      .insert(items)
      .values({
        harga: data.harga,
        kode: data.kode,
        nama: data.nama,
        stok: data.stok,
        perusahaan_id: data.perusahaan,
      })
      .returning();
  }

  findAll() {
    return this.db.select().from(items).execute();
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
      .set({
        harga: data.harga,
        kode: data.kode,
        nama: data.nama,
        stok: data.stok,
        perusahaan_id: data.perusahaan,
      })
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
}
