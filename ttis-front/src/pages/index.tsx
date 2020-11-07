import { SplitView } from '@jswf/react';
import { ContentsTreeView } from '@components/ContentsTreeView';
import { ContentsEditWindow } from '@components/ContentsEditWindow';
import { useRouter } from 'next/router';
import { getRoutePath } from '@libs/CustomRouter';
import { ContentsView } from '@components/ContentsView';

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

const Index = () => {
  return (
    <>
      <MainView />
      <ContentsEditWindow />
    </>
  );
};

export default Index;
