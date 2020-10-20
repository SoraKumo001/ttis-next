
import {
  ApolloLink,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import * as types from '@graphql/types';
import * as querys from '../src/user/user.resolver.graphql';

export const ObjectMask = (
  obj: unknown,
  mask: { [key: string]: unknown },
) => {
  if (!obj) return obj;
  if(typeof obj !== "object")
    return obj;
  const newObj: { [key: string]: unknown } = { ...obj };
  for (const [key, value] of Object.entries(newObj)) {
    const maskValue = mask[key];
    if (maskValue !== undefined) {
      newObj[key] = mask[key];
    } else if (typeof value === 'object' && value) {
      newObj[key] = ObjectMask(value as { [key: string]: unknown }, mask);
    }
  }
  return newObj;
};

export interface AuthLink extends ApolloLink {
  setToken: (token?: string) => void;
}
export const createAuthLink = (options: HttpLink.Options) => {
  let bearerToken: string;
  const apolloLink = setContext((_, { headers }) => ({
    headers: { ...headers, authorization: `bearer ${bearerToken || ''}` },
  })).concat(new HttpLink(options)) as AuthLink;
  apolloLink.setToken = (token) => {
    bearerToken = token || '';
  };
  return apolloLink;
};

export class CustomApolloClient extends ApolloClient<NormalizedCacheObject> {
  static port: number;
  link: AuthLink;
  constructor() {
    const link: AuthLink = createAuthLink({
      fetch,
      uri: `http://localhost:${CustomApolloClient.port}/graphql`,
    });
    super({ link, cache: new InMemoryCache().restore({}) });
    this.link = link;
  }
  setToken(token?: string) {
    this.link.setToken(token);
  }
  static setPort(port: number) {
    CustomApolloClient.port = port;
  }
}

export const login = async (client: CustomApolloClient) => {
  const result = await client.mutate<types.LoginMutation>({
    mutation: querys.MUTATION_LOGIN,
    variables: { name: 'admin', password: '' },
  });
  return result?.data?.login?.token;
};
