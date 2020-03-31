import {
  JSWindow,
  ListView,
  ListHeaders,
  ListHeader,
  ListItem,
  ListRow
} from "@jswf/react";
import { AutoClose, createAutoClose } from "@components/Header";
import { useRouter } from "next/router";
import { UserEdit } from "./UserEdit";

import { useQuery } from "react-apollo";
import React, { useRef, useState } from "react";
import { QUERY_USERS } from "./graphql";
import { UsersQuery } from "../../generated/graphql";
import { UserDel } from "./UserDel";

export const UserList = ({ autoClose }: { autoClose?: AutoClose }) => {
  const router = useRouter();
  const { loading, data } = useQuery<UsersQuery>(QUERY_USERS);
  const listView = useRef<ListView>();
  const [ids, setIds] = useState<number[]>([]);
  return (
    <JSWindow
      width={600}
      height={400}
      title="ユーザリスト"
      onUpdate={autoClose}
      clientStyle={{ display: "flex", flexDirection: "column" }}
    >
      <ListView ref={listView}>
        <ListHeaders>
          <ListHeader>ID</ListHeader>
          <ListHeader width={200}>Name</ListHeader>
          <ListHeader>Info</ListHeader>
        </ListHeaders>
        {!loading &&
          data.users?.map(({ id, name, info }) => (
            <ListRow key={id} value={id}>
              <ListItem>{id}</ListItem>
              <ListItem>{name}</ListItem>
              <ListItem>{info}</ListItem>
            </ListRow>
          ))}
      </ListView>

      <div>
        <button
          onClick={() => {
            router.push({
              pathname: router.pathname,
              query: { ...router.query, add: null }
            });
          }}
        >
          追加
        </button>
        <button
          onClick={() => {
            const list = listView.current;
            setIds(
              list.getSelectItems().map(index => list.getItemValue(index) as number)
            );

            router.push({
              pathname: router.pathname,
              query: { ...router.query, del: JSON.stringify(ids) }
            });
          }}
        >
          削除
        </button>
      </div>
      {router.query.add !== undefined && (
        <UserEdit autoClose={createAutoClose(router, "add")} />
      )}
      {router.query.del !== undefined && (
        <UserDel autoClose={createAutoClose(router, "del")} ids={ids} />
      )}
    </JSWindow>
  );
};
