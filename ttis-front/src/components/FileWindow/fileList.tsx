import { ListItem, ListRow, ListView, ListHeaders, ListHeader } from '@jswf/react';
import { useApolloClient, useQuery } from '@apollo/client';
import {
  DirFilesQuery,
  DirFilesQueryVariables,
  Files,
  UploadFileMutation,
  UploadFileMutationVariables,
} from '../../generated/graphql';
import { QUERY_FILES, UPLOAD_FILE } from './graphql';
import React, { useMemo } from 'react';
import { useRef } from 'react';

interface Props {
  dirId: string;
  dragString: string;
  onSelect?: (id: string) => void;
  onFileRename: (id: string, name: string) => void;
  onFileDelete: (id: string | string[]) => void;
}

export const FileListView = ({
  dirId,
  dragString,
  onSelect,
  onFileRename,
  onFileDelete,
}: Props) => {
  const client = useApolloClient();
  const listView = useRef<ListView>(null);
  const { data } = useQuery<DirFilesQuery, DirFilesQueryVariables>(QUERY_FILES, {
    variables: { id: dirId },
    skip: !dirId,
  });
  const fileMap = useMemo(() => {
    const fileMap = new Map<string, Files>();
    data?.dirFiles?.forEach((file) => {
      fileMap.set(file.id, file);
    });
    return fileMap;
  }, [data]);

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
          .dir {
            font-weight: bold;
          }
        `}
      </style>
      <div className="root">
        <ListView
          ref={listView}
          draggable={true}
          dragString={dragString}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            client.mutate<UploadFileMutation, UploadFileMutationVariables>({
              mutation: UPLOAD_FILE,
              variables: {
                parentId: dirId,
                file: file,
              },
              update: () => {
                //キャッシュの操作
                //client.resetStore();
                client.query<DirFilesQuery, DirFilesQueryVariables>({
                  query: QUERY_FILES,
                  variables: { id: dirId },
                  fetchPolicy: 'network-only',
                });
              },
            });
          }}
          onItemDoubleClick={(row) => {
            const file = data?.dirFiles?.[row];
            if (file) {
              if (file.kind === 0) {
                onSelect?.(file.id);
              } else {
                window.open(`/files/${file.id}`);
              }
            }
          }}
        >
          <ListHeaders>
            <ListHeader width={200}>File Name</ListHeader>
            <ListHeader width={80}>Size</ListHeader>
            <ListHeader>Update</ListHeader>
          </ListHeaders>
          {data?.dirFiles?.map((file) => (
            <ListRow key={file.id} value={file.id}>
              <ListItem>
                <div className={file.kind === 0 ? 'dir' : ''}>{file.name}</div>
              </ListItem>
              <ListItem>{file.size}</ListItem>
              <ListItem>{file.updateAt}</ListItem>
            </ListRow>
          ))}
        </ListView>
        <div className="panel">
          <button
            onClick={() => {
              const index = listView.current?.getSelectItem();
              if (index) {
                const id = listView.current?.getItemValue(index) as string;
                const file = fileMap.get(id);
                file && onFileRename(file.id, file.name);
              }
            }}
          >
            Rename
          </button>
          <button
            onClick={() => {
              const values = listView.current?.getSelectValues() as string[];
              if (values?.length) {
                const ids = values.map((index) => fileMap.get(index)?.id as string);
                onFileDelete(ids);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
