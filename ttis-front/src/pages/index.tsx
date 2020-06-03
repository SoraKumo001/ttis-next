import { SplitView } from "@jswf/react";
import { ContentsTreeView } from "@components/ContentsTreeView";
import { ContentsEditWindow } from "@components/ContentsEditWindow";
import { useRouter } from "next/router";
import { getRoutePath } from "@libs/CustomRouter";
import { ContentsView } from "@components/ContentsView";
import { FileWindow } from "@components/FileWindow";

const MainView = () => {
  const router = useRouter();
  getRoutePath(router);
  return (
    <>
      <style jsx>{`
        .root {
          position: relative;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div className="root">
        <SplitView>
          <ContentsTreeView />
          <ContentsView />
        </SplitView>
      </div>
    </>
  );
};

export default () => {
  return (
    <>
      <MainView />
      <ContentsEditWindow />
      <FileWindow/>
    </>
  );
};
