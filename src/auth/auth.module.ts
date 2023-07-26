import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { ServiceStrategy } from './strategy/service.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      async useFactory() {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            algorithm: 'HS256',
            expiresIn: '30d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ServiceStrategy],
})
export class AuthModule {}
