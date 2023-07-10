import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateItemSchema = z.object({
  nama: z.string().nonempty(),
  harga: z.number().min(1),
  stok: z.number().int().min(0),
  perusahaan_id: z.string().uuid(),
  kode: z.string().nonempty(),
});

export class CreateItemDto extends createZodDto(CreateItemSchema) {}
