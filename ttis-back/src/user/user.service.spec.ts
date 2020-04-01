import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DBModule } from '../db.module';
import { UserModule } from './user.module';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DBModule, UserModule],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    await service.onModuleInit();
  });
  it('onModuleInit', async () => {
    expect(await service.onModuleInit()).toMatchSnapshot();
  });
  it('Create User', async () => {
    expect(await service.setUser(undefined, 'Test', 'Pass')).toMatchSnapshot();
    expect(
      await service.setUser(undefined, 'Test2', 'Pass2'),
    ).toMatchSnapshot();
  });
  it('Delete User', async () => {
    expect(await service.deleteUser(2)).toMatchSnapshot();
  });
  it('List Users', async () => {
    expect(await service.users()).toMatchSnapshot();
  });
  it('List Users Params', async () => {
    expect(await service.users(["id","name"])).toMatchSnapshot();
  });
});
