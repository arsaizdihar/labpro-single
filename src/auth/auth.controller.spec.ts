import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserData } from './strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker((token) => {
        if (token === AuthService) {
          return {
            login: jest.fn().mockResolvedValue({
              token: 'test',
            }),
          };
        }
        return {};
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return login token', async () => {
    const result = await controller.login({
      username: 'test',
      password: 'test',
    });
    expect(result.token).toBeDefined();
  });

  it('should return current user', async () => {
    const user: UserData = {
      id: 1,
      name: 'test',
      username: 'test',
    };
    expect(controller.self(user)).toEqual(user);
  });
});
