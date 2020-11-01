import React, { useState } from 'react';
import { JSWindow, ListViewDragData, SplitView } from '@jswf/react';
import { DirTreeView } from './dirTree';
import { FileListView } from './fileList';
import { InputWindow } from './InputWindow';
import {
  QUERY_DIR,
  CREATE_DIR,
  RENAME_FILE,
  DELETE_FILE,
  QUERY_FILES,
  DELETE_FILES,
} from './graphql';
import { useApolloClient } from '@apollo/client';
import { VericationWindow } from './VerificationWindow';
import { MOVE_FILE } from './graphql';
import {
  DeleteFilesMutation,
  DeleteFilesMutationVariables,
  MoveFileMutation,
  MoveFileMutationVariables,
} from '../../generated/graphql';
import {
  CreateDirMutation,
  CreateDirMutationVariables,
  DeleteFileMutation,
  DeleteFileMutationVariables,
  DirFilesQuery,
  DirFilesQueryVariables,
  RenameFileMutation,
  RenameFileMutationVariables,
} from '@generated/graphql';
import { AutoClose } from '@components/Footer';

const DRAG_STRING = '__FILE_DRAG__';
const DRAG_DIR_STRING = '__DIR_DRAG__';

export const FileWindow = ({ autoClose }: { autoClose?: AutoClose }) => {
  const [dirId, setDirId] = useState('');
  const [createDir, setCreateDir] = useState<boolean>(false);
  const [renameFile, setRenameFile] = useState<{
    open: boolean;
    id?: string;
    name?: string;
  }>({ open: false });
  const [deleteFile, setDeleteFile] = useState<{
    open: boolean;
    id?: string | string[];
  }>({ open: false });
  const client = useApolloClient();

  return (
    <JSWindow onUpdate={autoClose} title="File Window" width={640}>
      <SplitView type="we">
        <DirTreeView
          dragString={DRAG_DIR_STRING}
          onSelect={(id) => setDirId(id)}
          dirId={dirId}
          onDirCreate={() => {
            setCreateDir(true);
          }}
          onFileDelete={(id) => {
            setDeleteFile({ open: true, id });
          }}
          onFileRename={(id, name) => {
            setRenameFile({ open: true, id, name });
          }}
          onItemDrop={(id, value) => {
            const v = JSON.parse(value) as ListViewDragData;
            if (v.type === DRAG_STRING) {
              v.items.forEach((item) => {
                client.mutate<MoveFileMutation, MoveFileMutationVariables>({
                  mutation: MOVE_FILE,
                  variables: {
                    targetId: id,
                    id: (item as { value: string }).value,
                  },
                  update: () => {
                    client.query<DirFilesQuery, DirFilesQueryVariables>({
                      query: QUERY_FILES,
                      variables: { id: dirId },
                      fetchPolicy: 'network-only',
                    });
                    client.query<DirFilesQuery, DirFilesQueryVariables>({
                      query: QUERY_FILES,
                      variables: { id: id },
                      fetchPolicy: 'network-only',
                    });
                  },
                });
              });
            } else if (v.type === DRAG_DIR_STRING) {
            }
            console.log(v);
          }}
        />
        <FileListView
          dragString={DRAG_STRING}
          onSelect={(id) => setDirId(id)}
          dirId={dirId}
          onFileDelete={(id) => {
            setDeleteFile({ open: true, id });
          }}
          onFileRename={(id, name) => {
            setRenameFile({ open: true, id, name });
          }}
        />
      </SplitView>
      {createDir && (
        <InputWindow
          title="Create Dir"
          onClose={() => setCreateDir(false)}
          onEnter={(input) =>
            client.mutate<CreateDirMutation, CreateDirMutationVariables>({
              mutation: CREATE_DIR,
              variables: {
                id: dirId!,
                name: input,
              },
              update: () => {
                setCreateDir(false);
                client.query({ query: QUERY_DIR, fetchPolicy: 'network-only' });
                client.query<DirFilesQuery, DirFilesQueryVariables>({
                  query: QUERY_FILES,
                  variables: { id: dirId },
                  fetchPolicy: 'network-only',
                });
              },
            })
          }
        />
      )}
      {renameFile?.open && (
        <InputWindow
          title="Rename"
          defaultValue={renameFile.name}
          onClose={() => setRenameFile({ open: false })}
          onEnter={(input) =>
            client.mutate<RenameFileMutation, RenameFileMutationVariables>({
              mutation: RENAME_FILE,
              variables: {
                id: renameFile.id as string,
                name: input,
              },
              update: () => {
                setRenameFile({ open: false });
              },
            })
          }
        />
      )}
      {deleteFile.open && (
        <VericationWindow
          title="Delete"
          onClose={() => setDeleteFile({ open: false })}
          onEnter={(value) => {
            if (value) {
              if (Array.isArray(deleteFile.id)) {
                client.mutate<DeleteFilesMutation, DeleteFilesMutationVariables>({
                  mutation: DELETE_FILES,
                  variables: {
                    ids: deleteFile.id as string[],
                  },
                  update: () => {
                    setDeleteFile({ open: false });
                    client.resetStore();
                  },
                });
              } else {
                client.mutate<DeleteFileMutation, DeleteFileMutationVariables>({
                  mutation: DELETE_FILE,
                  variables: {
                    id: deleteFile.id as string,
                  },
                  update: () => {
                    setDeleteFile({ open: false });
                    client.resetStore();
                  },
                });
              }
            }
          }}
          message="ファイルを削除しますか？"
        />
      )}
    </JSWindow>
  );
};
