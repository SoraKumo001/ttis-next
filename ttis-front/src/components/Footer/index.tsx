import { useRouter, NextRouter } from "next/router";
import { UserList } from "../User/UserList";
import { WindowState, WindowInfo } from "@jswf/react";
import { UserLogin } from "@components/User/UserLogin";
import { useEffect } from "react";
import { useQuery } from "react-apollo";
import Link from "next/link";
import imgLoginId from "../../images/login_id.svg";
import { CurrentUserQuery } from "@generated/graphql";
import { QUERY_CURRENT_USER } from "@components/User/graphql";

export const createAutoClose = (router: NextRouter, queryKey: string) => {
  {
    return (info?: WindowInfo) => {
      if (!info || info.realWindowState === WindowState.HIDE) {
        const query: { [key: string]: string[] | string | undefined } = {};
        Object.entries(router.query).forEach(([key, value]) => {
          if (key !== queryKey) {
            query[key] = value;
          }
        });
        router.push({ pathname: router.pathname, query });
      }
    };
  }
};
export type AutoClose = ReturnType<typeof createAutoClose>;
export interface AutoCloseProps {
  autoClose: AutoClose;
}

export const Footer = () => {
  const { data ,error,loading} = useQuery<CurrentUserQuery>(QUERY_CURRENT_USER);
  const user = data?.currentUser?.user;
  const router = useRouter();
  const { userList, login } = router.query;
  return (
    <>
      <style jsx>{`
        .root {
          display: flex;
          align-items: center;
          height: 2em;
          background-color: gray;
          color: white;
          padding: 0.5em;
          box-sizing: border-box;
        }
        .root > * {
          margin-right: 0.5em;
        }
        .button {
          display: flex;
          align-items: center;
          height: 100%;
          border-radius: 1em;
          background-color: white;
          padding: 4px;
          background-image: linear-gradient(#e8e8e8 0%, #d6d6d6 100%);
          border-bottom: solid 2px #b5b5b5;
          color: #999999;
          font-weight: bold;
          cursor: pointer;
        }
        .button:active {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5),
            0 2px 2px rgba(0, 0, 0, 0.19);
          border-bottom: none;
        }
        .button img {
          height: 100%;
        }
      `}</style>
      <div className="root">
        <Link href={router.pathname + "?login"} as="?login">
          <div className="button">
            <img src={imgLoginId} />
          </div>
        </Link>
        {user && user.name && (
          <>
            <div className="UserInfo">{user.name}</div>
            <Link href={router.pathname + "?userList"} as="?userList">
              <div className="button">UserEdit</div>
            </Link>
          </>
        )}
      </div>
      {userList !== undefined && (
        <UserList autoClose={createAutoClose(router, "userList")} />
      )}
      {login !== undefined && (
        <UserLogin autoClose={createAutoClose(router, "login")} />
      )}
    </>
  );
};
