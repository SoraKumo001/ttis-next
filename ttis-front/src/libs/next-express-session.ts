import expressSession from "express-session";
import { NextPageContext, NextComponentType } from "next";
import Express from "express";
import App from "next/app";

/**
 *Sessionデータタイプ
 *
 * @export
 * @interface SessionType
 */
export interface SessionType {
  [key: string]: unknown;
}

/**
 * Session用ページコンポーネントデータ
 *
 * @export
 * @interface NextSessionPageContext
 * @extends {NextPageContext}
 */
export interface NextSessionPageContext extends NextPageContext {
  session: { [key: string]: unknown };
}

/**
 * Session用ページコンポーネント定義
 *
 * @export
 * @interface NextSessionPage
 * @extends {NextComponentType}
 */

export type NextSessionPage<SP = {}, IP = {}, P = {}> = NextComponentType<
  NextSessionPageContext,
  IP | void,
  P & IP & { session: SP }
>;

//SSR時のSession情報保存
let sessionProps: SessionType;

/**
 * Sessionデータから特定の項目を除外する
 *
 * @param {SessionType} [session]
 * @param {string[]} [filters]
 * @returns
 */
export const createSessionProps = (
  session?: SessionType,
  filters?: string[]
) => {
  if (!session) return undefined;
  const result: SessionType = {};
  const f = ["cookie"];
  if (filters) f.push(...filters);
  for (const [key, value] of Object.entries(session))
    if (f.indexOf(key) === -1) result[key] = value;
  return result;
};

/**
 * SSRからSPAへデータを設定する
 *
 * @param {App} app
 */
export const initProps = (app: App) => {
  const { Component, pageProps, session } = app.props as App["props"] & {
    session?: SessionType;
  };
  if (session) sessionProps = session;

  Component.defaultProps = {
    ...Component.defaultProps,
    ...pageProps,
    session: sessionProps
  };
};
