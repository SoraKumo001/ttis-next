import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { AuthLink, createAuthLink } from './AuthLink';

export class CustomApolloClient extends ApolloClient<NormalizedCacheObject> {
  link: AuthLink;
  constructor(uri: string, token?: string | null, cache: NormalizedCacheObject = {}) {
    const link: AuthLink = createAuthLink({
      fetch,
      uri,
    });
    super({ link, cache: new InMemoryCache().restore(cache) });
    this.link = link;
    if (token) link.setToken(token);
  }
  setToken(token?: string) {
    this.link.setToken(token);
  }
  getToken() {
    return this.link.getToken();
  }
}
