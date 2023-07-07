import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateCompanySchema = z.object({
  nama: z.string().nonempty(),
  alamat: z.string().nonempty(),
  no_telp: z.string().nonempty(),
  kode: z.string().nonempty(),
});

export class CreateCompanyDto extends createZodDto(CreateCompanySchema) {}
