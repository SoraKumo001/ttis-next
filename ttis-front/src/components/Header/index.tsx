import { useRouter, NextRouter } from "next/router";
import { UserList } from "../User/UserList";
import { WindowState, WindowInfo } from "@jswf/react";
import { UserLogin } from "@components/User/UserLogin";
import { useQuery } from "react-apollo";
import { QUERY_CURRENT_USER } from "@components/User/graphql";
import { CurrentUserQuery } from "../../generated/graphql";

export const createAutoClose = (router: NextRouter, queryKey: string) => {
  {
    return (info?: WindowInfo) => {
      if (!info || info.realWindowState === WindowState.HIDE) {
        const query = {};
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

export const Header = () => {
  const router = useRouter();
  const { userList, login } = router.query;

  const { loading, data } = useQuery<CurrentUserQuery>(QUERY_CURRENT_USER);
  return (
    <>
      {userList !== undefined && (
        <UserList autoClose={createAutoClose(router, "userList")} />
      )}
      {login !== undefined && (
        <UserLogin autoClose={createAutoClose(router, "login")} />
      )}
      {
        !loading && data?.currentUser?.name
      }
    </>
  );
};
