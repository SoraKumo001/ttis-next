import { gql } from "@apollo/client";

export const QUERY_DIR = gql`
  query dirTree {
    dirTree {
      id
      kind
      name
      parentId
      size
      createAt
      updateAt
    }
  }
`;

export const QUERY_FILES = gql`
  query dirFiles($id: ID!) {
    dirFiles(id: $id) {
      id
      kind
      name
      parentId
      size
      createAt
      updateAt
    }
  }
`;

export const CREATE_DIR = gql`
  mutation createDir($id: ID!, $name: String!) {
    createDir(id: $id, name: $name) {
      id
      kind
      name
      parentId
      size
      createAt
      updateAt
    }
  }
`;
export const RENAME_FILE = gql`
  mutation renameFile($id: ID!, $name: String!) {
    renameFile(id: $id, name: $name) {
      id
      kind
      name
      parentId
      size
      createAt
      updateAt
    }
  }
`;
export const DELETE_FILE = gql`
  mutation deleteFile($id: ID!) {
    deleteFile(id: $id)
  }
`;
export const DELETE_FILES = gql`
  mutation deleteFiles($ids: [ID!]!) {
    deleteFiles(ids: $ids)
  }
`;
export const MOVE_FILE = gql`
  mutation moveFile($targetId: ID!, $id: ID!) {
    moveFile(targetId: $targetId, id: $id)
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($parentId: ID!, $file: Upload!) {
    uploadFile(parentId: $parentId, file: $file)
  }
`;
