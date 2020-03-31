import { JSWindow } from "@jswf/react";
import { AutoCloseProps } from "@components/Header";
import { useMutation } from "react-apollo";
import { QUERY_USERS, MUTATION_DELETE_USERS } from "./graphql";
import { UsersQuery } from '../../generated/graphql';

export const UserDel = ({
  autoClose,
  ids
}: AutoCloseProps & { ids: number[] }) => {
  const [deleteUsers] = useMutation(MUTATION_DELETE_USERS);
  return (
    <JSWindow title="Delete User" onUpdate={autoClose}>
      <style jsx>{`
        .form {
          box-sizing: border-box;
          margin: 0.5em;
          height: calc(100% - 1em);
          padding: 1em;
          background-color: #dddddd;
          border-radius: 1em;
        }
        .line {
          display: flex;
          justify-content: center;
          height: 2em;
          margin: 0.5em 0;
        }
      `}</style>
      <div className="form">
        <div className="line">{`${ids.length}件のデータを削除します`}</div>
        <div className="line">
          <button
            onClick={() => {
              const v = new Set(ids);
              deleteUsers({
                variables: { ids },
                update: (cache) => {
                  const { users } = cache.readQuery<UsersQuery>({ query: QUERY_USERS });
                  cache.writeQuery({
                    query: QUERY_USERS,
                    data: { users: users.filter(user => !v.has(user.id)) }
                  });
                }
              }).then(() => {
                autoClose();
              });
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </JSWindow>
  );
};
