import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateItemSchema = z.object({
  nama: z.string().nonempty(),
  harga: z.number().positive(),
  stok: z.number().int().positive(),
  perusahaan: z.string().uuid(),
  kode: z.string().nonempty(),
});

export class CreateItemDto extends createZodDto(CreateItemSchema) {}
