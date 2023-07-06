import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export class CredentialsDto extends createZodDto(CredentialsSchema) {}
