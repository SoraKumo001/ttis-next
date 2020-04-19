import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import gql from 'graphql-tag';
import { AppModule } from './../src/app.module';
import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import { GraphQLModule } from '@nestjs/graphql';
describe('GraphQL', () => {
  let app: INestApplication;
  let client: ApolloServerTestClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const module = moduleFixture.get<GraphQLModule>(
      GraphQLModule
    );

    client = createTestClient((module as any).apolloServer);
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
  });

  const queryTest = gql`
    query {
      contents {
        id
      }
    }
  `;

  it('query contents', async () => {
    expect(
      await client.query({
        query: queryTest,
      }),
    ).toMatchSnapshot();
  });
});
