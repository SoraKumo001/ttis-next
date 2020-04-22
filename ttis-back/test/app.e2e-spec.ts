import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import fetch from 'isomorphic-unfetch';
import { setContext } from 'apollo-link-context';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  ApolloLink,
} from 'apollo-boost';

interface AuthLink extends ApolloLink {
  setToken: (token: string) => void;
}
const createAuthLink = (options: HttpLink.Options) => {
  let bearerToken: string;
  const apolloLink = setContext((_, { headers }) => ({
    headers: { ...headers, authorization: `bearer ${bearerToken || ''}` },
  })).concat(new HttpLink(options)) as AuthLink;
  apolloLink.setToken = (token) => {
    bearerToken = token;
  };
  return apolloLink;
};

describe('GraphQL', () => {
  let app: INestApplication;
  let client: ApolloClient<NormalizedCacheObject>;
  let link: AuthLink;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    await app.listen(0);
    link = createAuthLink({
      fetch,
      uri: `http://localhost:${app.getHttpServer().address().port}/graphql`,
    });
    client = new ApolloClient({
      link,
      cache: new InMemoryCache().restore({}),
    });
  });
  const QUERY_LOGIN = gql`
    mutation Login($name: String!, $password: String!) {
      login(name: $name, password: $password) {
        token
        user {
          name
          info
        }
      }
    }
  `;
  const QUERY_CURRENT_USER = gql`
    query CurrentUser {
      currentUser {
        id
        name
        info
      }
    }
  `;
  it('mutation login', async () => {
    let result = await client.mutate({
      mutation: QUERY_LOGIN,
      variables: { name: 'admin', password: '' },
    });
    expect(result).toMatchSnapshot();
    link.setToken(result.data.login.token);
    result = await client.query({ query: QUERY_CURRENT_USER });
    expect(result).toMatchSnapshot();
  });
});
