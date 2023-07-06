import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { CredentialsDto } from './dto';
import { JwtGuard } from './guard';
import { UserData } from './strategy';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() credentials: CredentialsDto) {
    return this.authService.login(credentials.username, credentials.password);
  }

  @UseGuards(JwtGuard)
  @Get('/self')
  self(@GetUser() user: UserData) {
    return user;
  }
}
