import { JSWindow } from '@jswf/react';
import { AutoCloseProps } from '@components/Footer';
import imageLoginId from './images/login_id.svg';
import imageLoginPass from './images/login_pass.svg';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { QUERY_USERS, MUTATION_CREATE_USER } from './graphql';
import { UsersQuery } from '@generated/graphql';

export const UserEdit = ({ autoClose }: AutoCloseProps) => {
  const [createUser] = useMutation(MUTATION_CREATE_USER);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
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
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="line">
          <img src={imageLoginPass} />
          <input
            type="password"
            onChange={(e) => {
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
                  const result = cache.readQuery<UsersQuery>({ query: QUERY_USERS });
                  if (result && result.users)
                    cache.writeQuery({
                      query: QUERY_USERS,
                      data: { users: [...result.users, data.user] },
                    });
                },
              }).then(() => {
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
