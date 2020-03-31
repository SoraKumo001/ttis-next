import { JSWindow } from "@jswf/react";
import { AutoCloseProps } from "@components/Header";
import imageLoginId from "./images/login_id.svg";
import imageLoginPass from "./images/login_pass.svg";
import { useMutation } from "react-apollo";
import { useState } from "react";
import { MUTATION_USER, QUERY_USERS } from "./graphql";

export const UserEdit = ({ autoClose }: AutoCloseProps) => {
  const [createUser] = useMutation(MUTATION_USER);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <JSWindow title="UserEdit" onUpdate={autoClose}>
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
        .line img {
          margin: auto 1em;
          height: 80%;
        }
        input {
          border-radius: 0.3em;
          padding: 0.1em;
        }
      `}</style>
      <div className="form">
        <div className="line">New User</div>
        <div className="line">
          <img src={imageLoginId} />
          <input
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="line">
          <img src={imageLoginPass} />
          <input
            type="password"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="line">
          <button
            onClick={() => {
              createUser({
                variables: { name, password },
                update: (cache, { data }) => {
                  const { users } = cache.readQuery({ query: QUERY_USERS });
                  cache.writeQuery({
                    query: QUERY_USERS,
                    data: { users: [...users, data.user] }
                  });
                }
              }).then(result => {
                autoClose();
              });
            }}
          >
            Create
          </button>
        </div>
      </div>
    </JSWindow>
  );
};