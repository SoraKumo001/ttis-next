import Link from "next/link";
import { SplitView } from "@jswf/react";
import { ContentsTreeView } from "@components/ContentsTreeView";
import { ContentsEditWindow } from "@components/ContentsEditWindow";
import { useRouter } from "next/router";

const MainWindow = () => {
  const router = useRouter();

  return (
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
          <div>コンテンツエリア</div>
        </SplitView>
      </div>
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
      </div>
      <ContentsEditWindow />
    </>
  );
};
