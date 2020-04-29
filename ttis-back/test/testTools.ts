import { ApolloLink, HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

export const ObjectMask = (obj: object, mask: { [key: string]: unknown }) => {
  if (!obj) return obj;
  const newObj = { ...obj };
  for (const [key, value] of Object.entries(newObj)) {
    const maskValue = mask[key];
    if (maskValue !== undefined) {
      newObj[key] = mask[key];
    } else if (typeof value === 'object') {
      newObj[key] = ObjectMask(value, mask);
    }
  }
  return newObj;
};

class Sync<T> {
  private syncObject: Promise<T>;
  private resolve!: (value: T) => void;
  constructor() {
    this.syncObject = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  exec(proc: () => Promise<T>) {
    return async () => {
      const result = await proc();
      this.resolve(result);
      return result;
    };
  }
  lock() {
    return this.syncObject;
  }
}

export const beforeSync = <T>(proc: () => Promise<T>,timeout?: number) => {
  const sync = new Sync<T>();
  beforeAll(sync.exec(proc),timeout);
  return sync.lock();
};
export const concurrentSync = <T>(
  name: string,
  proc: () => Promise<T>,
  timeout?: number,
): Promise<T> => {
  const sync = new Sync<T>();
  it.concurrent(name, sync.exec(proc), timeout);
  return sync.lock();
};
export interface AuthLink extends ApolloLink {
  setToken: (token: string) => void;
}
export const createAuthLink = (options: HttpLink.Options) => {
  let bearerToken: string;
  const apolloLink = setContext((_, { headers }) => ({
    headers: { ...headers, authorization: `bearer ${bearerToken || ''}` },
  })).concat(new HttpLink(options)) as AuthLink;
  apolloLink.setToken = (token) => {
    bearerToken = token;
  };
  return apolloLink;
};
