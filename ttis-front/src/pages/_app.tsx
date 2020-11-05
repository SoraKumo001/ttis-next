import React from 'react';
import NextApp, { AppContext, AppInitialProps, createUrl } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { getMarkupFromTree } from '@apollo/react-ssr';
import * as nextRouter from 'next/router';
import { NextRouter } from 'next/router';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { CustomApolloClient } from '../libs/CustomApolloClient';
import { initProps, SessionType, createSessionProps } from '../libs/next-express-session';

export type NextWebVitalsMetrics = {
  id: string;
  label: string;
  name: string;
  startTime: number;
  value: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function reportWebVitals(metric: NextWebVitalsMetrics) {
  //console.log(metric);
}

const IS_BROWSER = !!process.browser;
const IS_DOCKER =
  process.env.NODE_ENV === 'production' && process.platform !== 'win32' && !IS_BROWSER;
const URI_ENDPOINT = IS_BROWSER
  ? '/graphql/'
  : IS_DOCKER
  ? 'http://ttis-nginx/graphql/'
  : 'http://localhost/graphql/';
// セッション情報内からクライアントへ送りたくないデータを指定
const SessionFilter: string[] = [];

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
    const session = (ctx?.req as undefined | { session?: SessionType })?.session;
    const graphqlToken = session?.graphqlToken as string | undefined;
    ssrClient = new CustomApolloClient(URI_ENDPOINT, graphqlToken);

    const context = {
      ...ctx,
      session,
    };
    const pageProps = Component.getInitialProps && (await Component.getInitialProps(context));

    const sessionProps = createSessionProps(session, SessionFilter);
    //SSR用GraphQLデータキャッシュの作成
    if (!IS_BROWSER) {
      //getMarkupFromTreeの中ではuseRouterが使えないので強制フック
      const ssrRouter = nextRouter.makePublicRouterInstance(router);
      (nextRouter as { useRouter: () => NextRouter }).useRouter = () => {
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
      const newToken = ssrClient.extract()['$ROOT_QUERY.currentUser']?.['token'];
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
  constructor(props: AppContext & AppInitialProps & { session: SessionType }) {
    super(props);
    this.client =
      ssrClient ||
      new CustomApolloClient(
        URI_ENDPOINT,
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
            animation: fadeIn 0.1s normal;
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
