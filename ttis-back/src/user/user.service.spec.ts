import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DBModule2 } from '../db.module';
import { UserModule } from './user.module';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [DBModule2, UserModule],
    }).compile();
    service = module.get<UserService>(UserService);
    await module.init();
  });
  afterAll(async () => {
    await module.close();
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
  });
  it('Update User', async () => {
    const result = await service.setUser(undefined, 'Test2', 'Pass2');
    expect(
      await service.setUser(result?.id, 'Test2-2', 'abc', { test: 123 }),
    ).toMatchSnapshot();
  });
  it('Delete User', async () => {
    expect(await service.deleteUser(2)).toMatchSnapshot();
  });
  it('List Users', async () => {
    expect(await service.users()).toMatchSnapshot();
  });
  it('List Users Params', async () => {
    expect(await service.users(['id', 'name'])).toMatchSnapshot();
  });
});
