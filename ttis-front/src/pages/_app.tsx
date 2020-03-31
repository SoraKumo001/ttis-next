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
import { Header } from '@components/Header';
const IS_BROWSER = !!process.browser;
const URI_ENDPOINT = "/graphql/";

// セッション情報内からクライアントへ送りたくないデータを指定
const SessionFilter: string[] = [];

function createClient(
  token: string | undefined | null,
  initialState: any = {}
) {
  return new ApolloClient({
    connectToDevTools: IS_BROWSER,
    ssrMode: !IS_BROWSER,
    link: new HttpLink({
      fetch,
      uri: URI_ENDPOINT,
      // headers: {
      //   authorization: `bearer ${token}`
      // }
    }),
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

export default class App extends NextApp<{ session: SessionType }> {
  static async getInitialProps({ ctx, Component }: AppContext) {
    //セッション情報の初期化(SPA時にはundefined)
    const session = (ctx?.req as undefined | { session?: SessionType })
      ?.session;
    const graphqlToken = session?.graphqlToken;
    const client = createClient(graphqlToken as string|undefined);
    const context = {
      ...ctx,
      session
    };
    const pageProps =
      Component.getInitialProps && (await Component.getInitialProps(context));
    await getMarkupFromTree({
      tree: (
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      )
    }).catch(() => {});
    return {
      pageProps: {
        ...pageProps,
        graphqlToken,
        apolloCache: client.extract()
      },
      session: createSessionProps(session, SessionFilter)
    };
  }
  state: State = {};
  onMessage(event: MessageEvent) {
    if (event?.data?.action === "UPDATE_GRAPHQL_TOKEN") {
      const token = event?.data?.token;
      if (token) localStorage.setItem("graphqlToken", token);
      else localStorage.removeItem("graphqlToken");
      this.setState({ client: createClient(token) });
      this.forceUpdate();
    }
  }
  componentDidMount() {
    const graphqlToken =
      typeof window !== "undefined" && localStorage.getItem("graphqlToken");
    if (graphqlToken) {
      if (!this.props.pageProps.token) {
        axios.post("/api/token", {
          graphqlToken
        });
      }
    }
    if (!this.state.client) {
      this.setState({
        client: createClient(
          this.props.pageProps.token || graphqlToken,
          this.props.pageProps.apolloCache
        )
      });
      this.forceUpdate();
    }
    addEventListener("message", e => this.onMessage(e));
  }
  render() {
    initProps(this);
    const { router, Component, pageProps } = this.props;
    return (
      <>
        {this.state.client && (
          <ApolloProvider client={this.state.client}>
            <Header/>
            <Component {...pageProps} url={createUrl(router)} />
          </ApolloProvider>
        )}
      </>
    );
  }
}
