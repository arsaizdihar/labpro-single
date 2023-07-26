import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const BuyItemSchema = z.object({
  total: z.number().min(1),
});

export class BuyItemDto extends createZodDto(BuyItemSchema) {}
