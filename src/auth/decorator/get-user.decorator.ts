import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserData } from '../strategy';

export interface IGetUserAuthInfoRequest extends Request {
  user: UserData;
}

export const GetUser = createParamDecorator(
  <T extends keyof UserData | undefined>(data: T, ctx: ExecutionContext) => {
    const request: IGetUserAuthInfoRequest = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
