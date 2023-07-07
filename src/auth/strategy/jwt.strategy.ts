import { Drizzle, DrizzleType } from '@/drizzle/drizzle.provider';
import { users } from '@/drizzle/schema';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

export type UserData = Awaited<ReturnType<JwtStrategy['validate']>>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, @Inject(Drizzle) private db: DrizzleType) {
    super({
      secretOrKey: config.get('JWT_SECRET'),
      jwtFromRequest: (req: Request) => req.headers.authorization,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const [user] = await this.db
      .select({ id: users.id, username: users.username, name: users.name })
      .from(users)
      .where(eq(users.id, payload.sub));
    return user;
  }
}
