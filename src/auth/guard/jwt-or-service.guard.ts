import { AuthGuard } from '@nestjs/passport';

export class JwtOrServiceGuard extends AuthGuard(['jwt', 'service']) {
  constructor() {
    super();
  }
}
