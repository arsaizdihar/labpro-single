import { Drizzle, DrizzleType } from '@/drizzle/drizzle.provider';
import { users } from '@/drizzle/schema';
import { HttpExceptionData } from '@/http/http-exception-data';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
@Injectable()
export class AuthService {
  constructor(
    @Inject(Drizzle) private readonly db: DrizzleType,
    private jwt: JwtService,
  ) {}

  async login(username: string, password: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username));
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpExceptionData(
        'Invalid credentials',
        HttpStatus.BAD_REQUEST,
        {},
      );
    }
    const token = this.signToken(user.id, user.username);
    return { user: { ...user, password: undefined }, token };
  }

  signToken(id: string, username: string) {
    return this.jwt.sign({ sub: id, username });
  }
}
