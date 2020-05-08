import Link from "next/link";
import { SplitView } from "@jswf/react";
import { ContentsTreeView } from "@components/ContentsTreeView";
import { QUERY_CURRENT_USER } from "@components/User/graphql";
import { CurrentUserQuery } from "@generated/graphql";
import { useQuery } from "react-apollo";
import imgLoginId from "../images/login_id.svg";
import { ColorPickerWindow } from "@components/ColorPicker";

const MainWindow = () => (
  <>
    <style jsx>{`
      .link {
        display: block;
      }
      .root {
        flex: 1;
        position: relative;
      }
    `}</style>
    <div className="root">
      <SplitView>
        <ContentsTreeView />
        <div>
          コンテンツエリア
        </div>
      </SplitView>
    </div>
  </>
);

const Footer = () => {
  const { loading, data } = useQuery<CurrentUserQuery>(QUERY_CURRENT_USER);
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
        <Link href="?login">
          <div className="button">
            <img src={imgLoginId} />
          </div>
        </Link>
        {data?.currentUser?.name && (
          <>
            <div className="UserInfo">{data?.currentUser?.name}</div>
            <Link href="?userList">
              <div className="button">UserEdit</div>
            </Link>
          </>
        )}
      </div>
      <ColorPickerWindow/>
    </>
  );
};

export default () => {
  return (
    <>
      <style jsx>{`
        .AppView {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
      <div className="AppView">
        <MainWindow />
        <Footer />
      </div>
    </>
  );
};
