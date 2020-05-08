import { TreeView, TreeItem } from "@jswf/react";
import { useQuery } from "react-apollo";
import { CONTENTS_TREE } from "./graphql";
import { ContentsListQuery } from "../../generated/graphql";

type ContentsItem = ContentsListQuery["contentsList"][0] & {
  children?: ContentsItem[];
};

export const ContentsTreeView = () => {
  const { loading, data } = useQuery<ContentsListQuery>(CONTENTS_TREE);
  const tree = data && createTree(data.contentsList);

  return loading ? (
    <div>Loading</div>
  ) : (
    <TreeView>{tree && createTreeItem(tree)}</TreeView>
  );

  function createTree(contentsList: ContentsItem[]) {
    if (!contentsList) return undefined;
    const idMap = new Map<String, ContentsItem>();
    contentsList.forEach((contents) => {
      idMap.set(contents.id, { ...contents });
    });
    contentsList.forEach((contents) => {
      const parent = contents.parentId && idMap.get(contents.parentId);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(contents);
      }
    });
    return idMap.get(contentsList[0].id);
  }
  function createTreeItem(item: ContentsItem) {
    return (
      <TreeItem key={item.id} label={item.title}>
        {item.children?.map((item) => createTreeItem(item))}
      </TreeItem>
    );
  }
};
