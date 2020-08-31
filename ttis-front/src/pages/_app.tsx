import React from "react";
import NextApp, { AppContext, createUrl } from "next/app";

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
} from "apollo-boost";
import { ApolloProvider, getMarkupFromTree } from "react-apollo";
import {
  initProps,
  SessionType,
  createSessionProps,
} from "../libs/next-express-session";
import { Header } from "@components/Header";
import * as nextRouter from "next/router";
import { setContext } from "apollo-link-context";
import { Footer } from "@components/Footer";
import { createUploadLink, UploadLinkOptions } from "apollo-upload-client";

export type NextWebVitalsMetrics = {
  id: string;
  label: string;
  name: string;
  startTime: number;
  value: number;
}

export function reportWebVitals(metric:NextWebVitalsMetrics) {
  console.log(metric)
}

const IS_BROWSER = !!process.browser;
const IS_DOCKER =
  process.env.NODE_ENV === "production" &&
  process.platform !== "win32" &&
  !IS_BROWSER;
const URI_ENDPOINT = IS_BROWSER
  ? "/graphql/"
  : IS_DOCKER
  ? "http://web-server/graphql/"
  : "http://localhost/graphql/";
// セッション情報内からクライアントへ送りたくないデータを指定
const SessionFilter: string[] = [];

export interface AuthLink extends ApolloLink {
  setToken: (token?: string) => void;
  getToken: () => string;
}
export const createAuthLink = (options: UploadLinkOptions) => {
  let bearerToken: string;
  const link = createUploadLink(options) as unknown as ApolloLink;
  const apolloLink = setContext((_, { headers }) => ({
    headers: { ...headers, authorization: `bearer ${bearerToken || ""}` },
  })).concat(link) as AuthLink;
  apolloLink.setToken = (token) => {
    bearerToken = token || "";
  };
  apolloLink.getToken = () => {
    return bearerToken;
  };
  return apolloLink;
};

export class CustomApolloClient extends ApolloClient<NormalizedCacheObject> {
  // static port: number=3000;
  link: AuthLink;
  constructor(token?: string | null, cache: NormalizedCacheObject = {}) {
    const link: AuthLink = createAuthLink({
      fetch,
      uri: URI_ENDPOINT,
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
  // static setPort(port: number) {
  //   CustomApolloClient.port = port;
  // }
}

export interface PagesProps {
  url?: ReturnType<typeof createUrl>;
  graphqlToken?: string;
}
export interface Props {
  pageProps: PagesProps;
}
let ssrClient: CustomApolloClient;

export default class App extends NextApp<{ session: SessionType }> {

  static async getInitialProps({ ctx, Component, router }: AppContext) {
    //セッション情報の初期化(SPA時にはundefined)
    const session = (ctx?.req as undefined | { session?: SessionType })
      ?.session;
    const graphqlToken = session?.graphqlToken as string | undefined;
    ssrClient = new CustomApolloClient(graphqlToken);

    const context = {
      ...ctx,
      session,
    };
    const pageProps =
      Component.getInitialProps && (await Component.getInitialProps(context));

    const sessionProps = createSessionProps(session, SessionFilter);
    //SSR用GraphQLデータキャッシュの作成
    if (!IS_BROWSER) {
      //getMarkupFromTreeの中ではuseRouterが使えないので強制フック
      const ssrRouter = nextRouter.makePublicRouterInstance(router);
      (nextRouter as any).useRouter = () => {
        return ssrRouter;
      };
      //仮コンポーネントでキャッシュを作る
      sessionProps &&
        (await getMarkupFromTree({
          tree: (
            <App
              pageProps={pageProps}
              Component={Component}
              router={router}
              session={sessionProps}
            />
          ),
        }).catch(() => {}));
      const newToken = ssrClient.extract()["$ROOT_QUERY.currentUser"]?.[
        "token"
      ];
      if (newToken) {
        session!.graphqlToken = newToken;
      }
    }

    return {
      pageProps: {
        ...pageProps,
        graphqlToken,
        apolloCache: ssrClient.extract(),
      },
      session: sessionProps,
    };
  }
  client: CustomApolloClient;
  constructor(props: any) {
    super(props);
    this.client =
      ssrClient ||
      new CustomApolloClient(
        props.session?.graphqlToken as string,
        props.pageProps.apolloCache
      );
  }
  render() {
    const { router, Component, pageProps } = this.props;
    const client = this.client;
    initProps(this);
    return (
      <>
        <style jsx global>{`
          html,
          body {
            margin: 0;
            height: 100%;
          }
        `}</style>
        <style jsx>{`
          .root {
            position: absolute;
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            animation: fadeIn 0.5s normal;
          }
          .body {
            position: relative;
            flex: 1;
          }
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }

            100% {
              opacity: 1;
            }
          }
        `}</style>
        {client && (
          <ApolloProvider client={client}>
            <div className="root">
              <Header {...pageProps} />
              <div className="body">
                <Component {...pageProps} url={createUrl(router)} />
              </div>
              <Footer {...pageProps} />
            </div>
          </ApolloProvider>
        )}
      </>
    );
  }
}
