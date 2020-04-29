import { Test, TestingModule } from '@nestjs/testing';
import { DBModule2 } from '../db.module';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { User } from '../user/user';

describe('AuthService', () => {
  let module: TestingModule;
  let service: AuthService;
  let testUser: User;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DBModule2, AuthModule],
    }).compile();
    await module.init();
    service = module.get<AuthService>(AuthService);
  });
  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Login', async () => {
    const result = await service.login('admin', '');
    expect(result.token).toBeDefined();
    expect(result.user).toBeDefined();
    testUser = result.user;
  });
  it('Login Failure', async () => {
    const result = await service.login('admin', 'test');
    expect(result).toBeNull();
  });
  it('validate', async () => {
    const result = await service.validate({
      id: testUser.id,
      password: testUser.password,
    });
    expect(result.id).toBeDefined();
  });
});
