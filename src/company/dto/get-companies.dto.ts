import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const GetCompaniesSchema = z.object({
  q: z.string().optional(),
});

export class GetCompaniesDto extends createZodDto(GetCompaniesSchema) {}
