import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import fetch from 'isomorphic-unfetch';
import * as fs from 'fs';
import * as path from 'path';

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost';
import { AuthLink, createAuthLink, beforeSync } from './testTools';

let app: INestApplication;
let port: number;
export class CustomApolloClient extends ApolloClient<NormalizedCacheObject> {
  link: AuthLink;
  constructor() {
    const link: AuthLink = createAuthLink({
      fetch,
      uri: `http://localhost:${port}/graphql`,
    });
    super({ link, cache: new InMemoryCache().restore({}) });
  }
  setToken(token: string) {
    this.link.setToken(token);
  }
}

const execTest = (dir: string = __dirname) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.resolve(dir, file);
    const state = fs.statSync(filePath);
    if (state.isDirectory()) execTest(filePath);
    else /.*\.test\.ts$/.test(file) && require(filePath);
  });
};

export const before = beforeSync(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = module.createNestApplication();
  await app.init();
  await app.listen(0);
  port = app.getHttpServer().address().port;
});
export const createClient = async()=>{
  await before;
  return new CustomApolloClient();
}
afterAll(async () => {
  await app.close();
});

describe('Test', () => {
  execTest();
});
