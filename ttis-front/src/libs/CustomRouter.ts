import { NextRouter } from 'next/router';
import Url from 'url';
import { ParsedUrlQueryInput } from 'querystring';

export const addRouterQuery = (router: NextRouter, params: { [key: string]: string }) => {
  const url = Url.parse(router.asPath, true);
  return router.push(router.pathname, {
    pathname: url.pathname,
    query: { ...url.query, ...params },
  });
};
export const removeRouterQuery = (router: NextRouter, key: string) => {
  const url = Url.parse(router.asPath, true);
  if (url.query[key]) delete url.query[key];

  if (key in url.query) delete url.query[key];
  return router.push(router.pathname, {
    pathname: url.pathname,
    query: url.query,
  });
};
export const getRouterQuery = (router: NextRouter) => {
  const url = Url.parse(router.asPath, true);
  return url.query;
};
export const setRouterPath = (
  router: NextRouter,
  path: string,
  query?: ParsedUrlQueryInput,
  params?: ParsedUrlQueryInput
) => {
  const url = Url.parse(router.asPath, true);
  return router.push(
    { pathname: router.pathname, query: params },
    { pathname: path, query: query || url.query }
  );
};

export const getRoutePath = (router: NextRouter) => {
  const url = Url.parse(router.asPath);
  return url.pathname?.split('/').filter((s) => s.length) || [];
};
