import { GetCompaniesSchema } from '@/company/dto/get-companies.dto';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const GetItemsSchema = GetCompaniesSchema.extend({
  perusahaan_id: z.string().optional(),
});

export class GetItemsDto extends createZodDto(GetItemsSchema) {}
