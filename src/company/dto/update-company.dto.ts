import { createZodDto } from 'nestjs-zod';
import { CreateCompanySchema } from './create-company.dto';

export class UpdateCompanyDto extends createZodDto(
  CreateCompanySchema.partial(),
) {}
