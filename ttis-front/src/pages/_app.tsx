import React from "react";
import NextApp, { AppContext, createUrl } from "next/app";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "apollo-boost";
import fetch from "isomorphic-unfetch";
import { ApolloProvider, getMarkupFromTree } from "react-apollo";
import {
  initProps,
  SessionType,
  createSessionProps
} from "../libs/next-express-session";
import axios from "axios";
import { Header } from "@components/Header";
import * as nextRouter from "next/router";
import { setContext } from "apollo-link-context";
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

function createClient(
  token: string | undefined | null,
  initialState: any = {}
) {
  const authLink = setContext((_, { headers }) => {
    //GraphQLのTokenの変更対応処理
    const newToken =
      (typeof window !== undefined && localStorage.getItem("graphqlToken")) ||
      token;
    return {
      headers: {
        ...headers,
        authorization: newToken ? `Bearer ${newToken}` : ""
      }
    };
  });
  const link = new HttpLink({
    fetch,
    uri: URI_ENDPOINT,
    headers: {
      authorization: token ? `Bearer ${token}` : ""
    }
  });

  return new ApolloClient({
    connectToDevTools: IS_BROWSER,
    ssrMode: !IS_BROWSER,
    link: IS_BROWSER ? authLink.concat(link) : link,
    cache: new InMemoryCache().restore(initialState)
  });
}

export interface PagesProps {
  url?: ReturnType<typeof createUrl>;
  graphqlToken?: string;
}
export interface Props {
  pageProps: PagesProps;
}
interface State {
  client?: ApolloClient<NormalizedCacheObject>;
}
let ssrClient: ApolloClient<NormalizedCacheObject>;

export default class App extends NextApp<{ session: SessionType }> {
  static async getInitialProps({ ctx, Component, router }: AppContext) {
    //セッション情報の初期化(SPA時にはundefined)
    const session = (ctx?.req as undefined | { session?: SessionType })
      ?.session;
    const graphqlToken = session?.graphqlToken as string | undefined;
    ssrClient = createClient(graphqlToken);

    const context = {
      ...ctx,
      session
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
      await getMarkupFromTree({
        tree: (
          <App
            pageProps={pageProps}
            Component={Component}
            router={router}
            session={sessionProps}
          />
        )
      }).catch(() => {});
    }

    return {
      pageProps: {
        ...pageProps,
        graphqlToken,
        apolloCache: ssrClient.extract()
      },
      session: sessionProps
    };
  }
  state: State = { client: ssrClient };
  componentDidMount() {
    let graphqlToken = localStorage.getItem("graphqlToken");
    if (graphqlToken) {
      if (this.props.pageProps.graphqlToken !== graphqlToken) {
        axios.post("/api/token", {
          graphqlToken
        });
      }
    } else {
      graphqlToken = this.props.pageProps.graphqlToken;
      if (graphqlToken) {
        localStorage.setItem("graphqlToken", graphqlToken);
      }
    }
    if (!this.state.client)
      this.setState({
        client: createClient(graphqlToken, this.props.pageProps.apolloCache)
      });
  }
  render() {
    const { router, Component, pageProps } = this.props;
    const client = this.state.client;
    initProps(this);
    return (
      <>
        {client && (
          <ApolloProvider client={client}>
            <Header {...pageProps} />
            <Component {...pageProps} url={createUrl(router)} />
          </ApolloProvider>
        )}
      </>
    );
  }
}
