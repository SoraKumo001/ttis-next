import { JSWindow } from "@jswf/react";
import { AutoClose } from "@components/Header";
import imageLoginId from "./images/login_id.svg";
import imageLoginPass from "./images/login_pass.svg";
export const UserLogin = ({ autoClose }: { autoClose?: AutoClose }) => (
  <JSWindow title="Login" onUpdate={autoClose} height={200}>
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
          <input />
        </div>

        <div className="line">
          <img src={imageLoginPass} />
          <input type="password" />
        </div>
        <div className="line">
          <button>Login</button>
        </div>
      </div>
    </div>
  </JSWindow>
);
