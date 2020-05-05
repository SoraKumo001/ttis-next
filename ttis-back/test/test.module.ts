import { beforeAllAsync, afterAllAsync } from 'jest-async';
import { CustomApolloClient } from './testTools';
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

let app: INestApplication;

export const before = beforeAllAsync(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = module.createNestApplication();
  await app.init();
  await app.listen(0);
  CustomApolloClient.setPort(app.getHttpServer().address().port);
});
export const createClient = async () => {
  await before;
  return new CustomApolloClient();
};
afterAllAsync(async () => {
  await app.close();
});