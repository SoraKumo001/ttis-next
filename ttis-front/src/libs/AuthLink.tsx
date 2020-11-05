import { ApolloLink } from '@apollo/client';
import { createUploadLink, UploadLinkOptions } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

export interface AuthLink extends ApolloLink {
  setToken: (token?: string) => void;
  getToken: () => string;
}

export const createAuthLink = (options: UploadLinkOptions) => {
  let bearerToken: string;
  const link = (createUploadLink(options) as unknown) as ApolloLink;
  const apolloLink = setContext((_, { headers }) => ({
    headers: { ...headers, authorization: `bearer ${bearerToken || ''}` },
  })).concat(link) as AuthLink;
  apolloLink.setToken = (token) => {
    bearerToken = token || '';
  };
  apolloLink.getToken = () => {
    return bearerToken;
  };
  return apolloLink;
};
