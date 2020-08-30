import { useQuery, useApolloClient } from "react-apollo";
import { TreeView, TreeItem } from "@jswf/react";
import { QUERY_DIR, CREATE_DIR, RENAME_FILE } from "./graphql";
import { useMemo, useState, useRef, useEffect } from "react";
import {
  DirTreeQuery,
  CreateDirMutation,
  CreateDirMutationVariables,
  RenameFileMutation,
  RenameFileMutationVariables,
} from "@generated/graphql";
import { InputWindow } from "./InputWindow";

type DirItem = NonNullable<DirTreeQuery["dirTree"]>[0] & {
  parent?: DirItem;
  children?: DirItem[];
};

export const DirTreeView = () => {
  const { data } = useQuery<DirTreeQuery>(QUERY_DIR);
  const treeViewRef = useRef<TreeView>(null);

  const tree = useMemo(() => data && createTree(data.dirTree), [data]);
  const [createDir, setCreateDir] = useState<boolean>(false);
  const [renameFile, setRenameFile] = useState<boolean>(false);
  let selectItemRef = useRef<DirItem>();
  const selectItem = selectItemRef.current;

  const client = useApolloClient();

  useEffect(() => {
    const treeView = treeViewRef.current;
    if (!treeView!.getSelectItem()) {
      const item = treeView?.getItem();
      if(item){
        item.select();
        selectItemRef.current = item.getValue() as DirItem;
      }
   }
  }, []);
  return (
    <>
      <style jsx>
        {`
          .root {
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
          }
          .root > :first-child {
            flex: 1;
          }
          .panel {
            background: #aaaaaa;
          }
        `}
      </style>
      <div className="root">
        <TreeView ref={treeViewRef} onItemClick={item=>{
          selectItemRef.current = item.getValue() as DirItem;
        }}>{tree && createTreeItem(tree)}</TreeView>
        <div className="panel">
          <button onClick={() => setCreateDir(true)}>Create</button>
          <button onClick={() => setRenameFile(true)}>Rename</button>
          <button>Delete</button>
        </div>
      </div>
      {createDir && (
        <InputWindow
          title="Create Dir"
          onClose={() => setCreateDir(false)}
          onEnter={(input) =>
            client.mutate<CreateDirMutation, CreateDirMutationVariables>({
              mutation: CREATE_DIR,
              variables: {
                id: selectItem?.id!,
                name: input,
              },
              update: () => {
                setCreateDir(false);
                client.query({ query: QUERY_DIR, fetchPolicy: "network-only" });
              },
            })
          }
        />
      )}
      {renameFile && (
        <InputWindow
          title="Rename"
          defaultValue={selectItem?.name}
          onClose={() => setRenameFile(false)}
          onEnter={(input) =>
            client.mutate<RenameFileMutation, RenameFileMutationVariables>({
              mutation: RENAME_FILE,
              variables: {
                id: selectItem?.id as string,
                name: input
              },
              update: () => {
                setRenameFile(false);
                // client.query({ query: QUERY_DIR, fetchPolicy: "network-only" });
              },
            })
          }
        />
      )}
    </>
  );

  function createTree(list: DirItem[] | null | undefined) {
    if (!list) return undefined;
    const idMap = new Map<String, DirItem>();
    list.forEach((contents) => {
      idMap.set(contents.id, { ...contents });
    });
    list.forEach((c) => {
      const contents = idMap.get(c.id)!;
      const parent = contents.parentId && idMap.get(contents.parentId);
      if (parent) {
        if (!parent.children) parent.children = [];
        contents.parent = parent;
        parent.children.push(contents);
      }
    });
    idMap.forEach((c) => {
      c.children?.sort((a, b) => (a.name > b.name ? -1 : 1));
    });
    return idMap.get(list[0].id);
  }
  function createTreeItem(item: DirItem) {
    return (
      <TreeItem key={item.id} label={item.name} value={item}>
        {item.children?.map((item) => createTreeItem(item))}
      </TreeItem>
    );
  }
};
