import { createZodDto } from 'nestjs-zod';
import { CreateItemSchema } from './create-item.dto';

export class UpdateItemDto extends createZodDto(CreateItemSchema.partial()) {}
