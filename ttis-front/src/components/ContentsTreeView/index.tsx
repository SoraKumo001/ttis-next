import { TreeView, TreeItem } from '@jswf/react';
import { useQuery } from '@apollo/client';
import { CONTENTS_TREE } from './graphql';
import { ContentsListQuery } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { addRouterQuery, setRouterPath, getRoutePath } from '../../libs/CustomRouter';
import { useMemo } from 'react';

type ContentsItem = ContentsListQuery['contentsList'][0] & {
  parent?: ContentsItem;
  children?: ContentsItem[];
};

export const ContentsTreeView = () => {
  const { loading, data } = useQuery<ContentsListQuery>(CONTENTS_TREE);
  const router = useRouter();
  const tree = useMemo(() => data && createTree(data.contentsList), [data]);
  const id = getRoutePath(router)[1] || tree?.id;
  return loading ? (
    <div>Loading</div>
  ) : (
    <>
      <style>{`
        .item {
          color: cadetblue;
          font-size:90%;
        }
        .hidden{
          background-color: #ffeeee;
        }
      `}</style>
      <TreeView userSelect={false} onItemClick={onClick} onItemDoubleClick={onDoubleClick}>
        {tree && createTreeItem(tree)}
      </TreeView>
    </>
  );

  function createTree(contentsList: ContentsItem[]) {
    if (!contentsList) return undefined;
    const idMap = new Map<string, ContentsItem>();
    contentsList.forEach((contents) => {
      idMap.set(contents.id, { ...contents });
    });
    contentsList.forEach((c) => {
      const contents = idMap.get(c.id)!;
      const parent = contents.parentId && idMap.get(contents.parentId);
      if (parent) {
        if (!parent.children) parent.children = [];
        contents.parent = parent;
        parent.children.push(contents);
      }
    });
    idMap.forEach((c) => {
      c.children?.sort((a, b) => (a.page && !b.page ? -1 : a.priority - b.priority));
    });
    return idMap.get(contentsList[0].id);
  }
  function createTreeItem(item: ContentsItem) {
    return (
      <TreeItem
        key={item.id}
        label={
          <div
            className={`${item.page ? 'page' : 'item'} ${
              item.visible === true ? 'visible' : 'hidden'
            }`}
          >
            {item.title}
          </div>
        }
        value={item}
        select={item.id === id}
      >
        {item.children?.map((item) => createTreeItem(item))}
      </TreeItem>
    );
  }
  function onClick(item: TreeItem) {
    const contents = item.getValue() as ContentsItem;
    if (contents.id === tree?.id) setRouterPath(router, `/`);
    else {
      let c: ContentsItem | undefined = contents;
      while (c && !c.page) {
        c = c.parent;
      }
      const id = c ? c.id : contents.id;
      setRouterPath(router, `/page/${contents.id}/`, undefined, { id });
    }
  }
  function onDoubleClick(item: TreeItem) {
    const { id } = item.getValue() as { id: string };
    addRouterQuery(router, { edit: id });
  }
};
