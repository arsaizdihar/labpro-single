import { GetCompaniesSchema } from '@/company/dto/get-companies.dto';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const GetItemsSchema = GetCompaniesSchema.extend({
  perusahaan: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});

export class GetItemsDto extends createZodDto(GetItemsSchema) {}
