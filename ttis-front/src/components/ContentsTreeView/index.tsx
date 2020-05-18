import { TreeView, TreeItem } from "@jswf/react";
import { useQuery } from "react-apollo";
import { CONTENTS_TREE } from "./graphql";
import { ContentsListQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import {
  addRouterQuery,
  setRouterPath,
  getRoutePath,
} from "../../libs/CustomRouter";
import { useRef, useEffect } from "react";

type ContentsItem = ContentsListQuery["contentsList"][0] & {
  parent?: ContentsItem;
  children?: ContentsItem[];
};

export const ContentsTreeView = () => {
  const { loading, data } = useQuery<ContentsListQuery>(CONTENTS_TREE);
  const router = useRouter();
  const tree = data && createTree(data.contentsList);
  const id = getRoutePath(router)[1] || tree?.id;

  return loading ? (
    <div>Loading</div>
  ) : (
    <>
      <style>{`
        .item {
          color: cadetblue;
        }
      `}</style>
      <TreeView
        userSelect={false}
        onItemClick={onClick}
        onItemDoubleClick={onDoubleClick}
      >
        {tree && createTreeItem(tree)}
      </TreeView>
    </>
  );

  function createTree(contentsList: ContentsItem[]) {
    if (!contentsList) return undefined;
    const idMap = new Map<String, ContentsItem>();
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
    return idMap.get(contentsList[0].id);
  }
  function createTreeItem(item: ContentsItem) {
    return (
      <TreeItem
        key={item.id}
        label={<div className={item.page ? "page" : "item"}>{item.title}</div>}
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
      setRouterPath(router, `/page/${contents.id}/`, { id });
    }
  }
  function onDoubleClick(item: TreeItem) {
    const { id } = item.getValue() as { id: string };
    addRouterQuery(router, { edit: id });
  }
};
