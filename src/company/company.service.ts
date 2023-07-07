import { Drizzle, DrizzleType } from '@/drizzle/drizzle.provider';
import { companies } from '@/drizzle/schema';
import { HttpExceptionData } from '@/http/http-exception-data';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(@Inject(Drizzle) private readonly db: DrizzleType) {}

  async create(data: CreateCompanyDto) {
    return await this.db
      .insert(companies)
      .values({
        nama: data.nama,
        alamat: data.alamat,
        kode: data.kode,
        no_telp: data.no_telp,
      })
      .returning();
  }

  findAll() {
    return this.db.select().from(companies).execute();
  }

  async findOne(id: string) {
    const [company] = await this.db
      .select()
      .from(companies)
      .where(eq(companies.id, id));
    if (!company) {
      throw new HttpExceptionData('Company not found', HttpStatus.NOT_FOUND);
    }
    return company;
  }

  async update(id: string, data: UpdateCompanyDto) {
    const [result] = await this.db
      .update(companies)
      .set({
        nama: data.nama,
        alamat: data.alamat,
        kode: data.kode,
        no_telp: data.no_telp,
      })
      .where(eq(companies.id, id))
      .returning();

    if (!result) {
      throw new HttpExceptionData('Company not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async remove(id: string) {
    const [result] = await this.db
      .delete(companies)
      .where(eq(companies.id, id))
      .returning();

    if (!result) {
      throw new HttpExceptionData('Company not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
