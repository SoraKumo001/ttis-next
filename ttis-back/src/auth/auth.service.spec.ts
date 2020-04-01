import { Test, TestingModule } from '@nestjs/testing';
import { DBModule } from '../db.module';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { User } from 'src/user/user';

describe('AuthService', () => {
  let service: AuthService;
  let testUser: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DBModule, AuthModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Login', async () => {
    expect(
      await service.login('admin', '').then(({ token, user }) => {
        testUser = user;
        return { token: token.substring(0,20), user };
      }),
    ).toMatchSnapshot();
  });
  it('Login Failure', async () => {
    expect(await service.login('admin', 'test')).toMatchSnapshot();
  });
  it('validate', async () => {
    expect(
      await service.validate({ id: testUser.id, password: testUser.password }),
    ).toMatchSnapshot();
  });
});
