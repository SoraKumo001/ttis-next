import { useQuery } from '@apollo/client';
import { TreeView, TreeItem } from '@jswf/react';
import { QUERY_DIR } from './graphql';
import { useMemo, useRef, useEffect } from 'react';
import { DirTreeQuery } from '@generated/graphql';

type DirItem = NonNullable<DirTreeQuery['dirTree']>[0] & {
  parent?: DirItem;
  children?: DirItem[];
};

interface Props {
  dragString: string;
  dirId?: string;
  onSelect?: (id: string) => void;
  onDirCreate: (id: string) => void;
  onFileRename: (id: string, name: string) => void;
  onFileDelete: (id: string) => void;
  onItemDrop: (id: string, value: string) => void;
}

export const DirTreeView = ({
  onSelect,
  dirId,
  onDirCreate,
  onFileRename,
  onFileDelete,
  onItemDrop,
  dragString,
}: Props) => {
  const { data } = useQuery<DirTreeQuery>(QUERY_DIR);
  const treeViewRef = useRef<TreeView>(null);
  const treeMap = useMemo(() => data && createTree(data.dirTree), [data]);

  useEffect(() => {
    const treeView = treeViewRef.current;
    if (dirId) {
      const item = treeView?.findItem(dirId);
      if (item && item !== treeView?.getItem()) {
        item.select();
      }
    } else if (!treeView!.getSelectItem()) {
      const item = treeView?.getItem();
      if (item) {
        item.select();
        onSelect?.(item.getValue() as string);
      }
    }
  }, [data, dirId]);
  return (
    <div className="root">
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
      <TreeView
        ref={treeViewRef}
        draggable={true}
        onItemClick={(item) => {
          const id = item.getValue() as string;
          if (id !== dirId) onSelect?.(id);
        }}
        onItemDrop={(e, item) => {
          const data = e.dataTransfer.getData('text/plain');
          onItemDrop(item.getValue() as string, data);
        }}
        onItemDragStart={(e, item) => {
          const id = item.getValue();
          const value = { type: dragString, id };
          e.dataTransfer.setData('text/plain', JSON.stringify(value));
        }}
      >
        {createTreeItem(treeMap?.get(data?.dirTree?.[0]?.id as string))}
      </TreeView>
      <div className="panel">
        <button onClick={() => dirId && onDirCreate?.(dirId)}>Create</button>
        <button onClick={() => dirId && onFileRename?.(dirId, treeMap?.get(dirId)?.name as string)}>
          Rename
        </button>
        <button onClick={() => dirId && onFileDelete?.(dirId)}>Delete</button>
      </div>
    </div>
  );

  function createTree(list: DirItem[] | null | undefined) {
    if (!list) return undefined;
    const idMap = new Map<string, DirItem>();
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
      c.children?.sort((a, b) => (a.name < b.name ? -1 : 1));
    });
    return idMap;
  }
  function createTreeItem(item?: DirItem) {
    if (!item) return null;
    return (
      <TreeItem key={item.id} label={item.name} value={item.id}>
        {item.children?.map((item) => createTreeItem(item))}
      </TreeItem>
    );
  }
};
