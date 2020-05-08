import { JSWindow } from "@jswf/react";
import { AutoClose } from "@components/Footer";
import imageLoginId from "./images/login_id.svg";
import imageLoginPass from "./images/login_pass.svg";
import { useMutation, useApolloClient } from "react-apollo";
import { QUERY_LOGIN } from "./graphql";
import { useState } from "react";
import axios from "axios";
import { LoginMutation } from "@generated/graphql";
export const UserLogin = ({ autoClose }: { autoClose?: AutoClose }) => {
  const client = useApolloClient();
  const [login, { loading }] = useMutation<LoginMutation>(QUERY_LOGIN);
  const [title, setTitle] = useState("Login");
  const [name, setName] = useState(
    (typeof window !== "undefined" && localStorage.getItem("lastUser")) || ""
  );
  const [password, setPassword] = useState("");
  return (
    <JSWindow title={loading?"Logging in":title} onUpdate={autoClose} height={200}>
      <style jsx>{`
        .form {
          display: flex;
          box-sizing: border-box;
          margin: 0.5em;
          height: calc(100% - 1em);
          padding: 1em;
          background-color: #dddddd;
          border-radius: 1em;
          overflow: hidden;
        }
        .form > div {
          margin: auto;
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
        <div>
          <div className="line">
            <img src={imageLoginId} />
            <input
              ref={input => input && input.focus()}
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
              disabled={loading}
              onClick={() => {
                login({
                  variables: { name, password },
                  update: (_cache, { data }) => {
                    if (data && data.login) {
                      localStorage.setItem("lastUser", name);
                      localStorage.setItem("graphqlToken", data.login.token);
                      autoClose && autoClose();
                      axios.post("/api/token", {
                        graphqlToken: data.login.token
                      });
                      client.resetStore();
                    }
                  }
                }).catch(() => {
                  setTitle("Login Error");
                });
              }}
            >
              Login
            </button>
            <button
              disabled={loading}
              onClick={() => {
                const graphqlToken = localStorage.getItem("graphqlToken");
                axios
                  .post("/api/logout", {
                    graphqlToken
                  })
                  .then(() => {
                    localStorage.removeItem("graphqlToken");
                    client.resetStore();
                    autoClose && autoClose();
                  });
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </JSWindow>
  );
};
