import { AuthGuard } from '@nestjs/passport';

export class ServiceGuard extends AuthGuard('service') {
  constructor() {
    super();
  }
}
