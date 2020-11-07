import React, { useMemo } from 'react';
import { AppContext, AppProps, createUrl } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { getMarkupFromTree } from '@apollo/react-ssr';
import * as nextRouter from 'next/router';
import { NextRouter } from 'next/router';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { CustomApolloClient } from '../libs/CustomApolloClient';
import { SessionType, createSessionProps } from '../libs/next-express-session';
import './global.css';
import styles from './_app.module.css';

export type NextWebVitalsMetrics = {
  id: string;
  label: string;
  name: string;
  startTime: number;
  value: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function reportWebVitals(metric: NextWebVitalsMetrics) {
  console.log(metric);
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

const App = (props: AppProps & { session: SessionType }) => {
  const { router, Component, pageProps, session } = props;
  const client = useMemo(
    () =>
      ssrClient ||
      new CustomApolloClient(URI_ENDPOINT, session?.graphqlToken as string, pageProps.apolloCache),
    []
  );
  //initProps(props);
  return (
    client && (
      <ApolloProvider client={client}>
        <div className={styles.root}>
          <Header {...pageProps} />
          <div className={styles.body}>
            <Component {...pageProps} url={createUrl(router)} className="abc"/>
          </div>
          <Footer {...pageProps} />
        </div>
      </ApolloProvider>
    )
  );
};

App.getInitialProps = async ({ ctx, Component, router }: AppContext) => {
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
          <App pageProps={pageProps} Component={Component} router={router} session={sessionProps} />
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
};
export default App;
