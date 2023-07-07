import { Drizzle, DrizzleType } from '@/drizzle/drizzle.provider';
import { users } from '@/drizzle/schema';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
@Injectable()
export class AuthService {
  constructor(
    @Inject(Drizzle) private readonly db: DrizzleType,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(username: string, password: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username));
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    delete user.password;
    const token = this.signToken(user.id, user.username);
    return { user, token };
  }

  signToken(id: number, username: string) {
    return this.jwt.sign({ sub: id, username });
  }
}
