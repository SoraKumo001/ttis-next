import { useRouter, NextRouter } from "next/router";
import { UserList } from "../User/UserList";
import { WindowState, WindowInfo } from "@jswf/react";
import { UserLogin } from "@components/User/UserLogin";

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
  const router = useRouter();
  const { userList, login } = router.query;
  return (
    <>
      {userList !== undefined && (
        <UserList autoClose={createAutoClose(router, "userList")} />
      )}
      {login !== undefined && (
        <UserLogin autoClose={createAutoClose(router, "login")} />
      )}
    </>
  );
};
