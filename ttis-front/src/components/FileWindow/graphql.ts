import { gql } from "apollo-boost";

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
export const MOVE_FILE = gql`
  mutation moveFile($targetId: ID!, $id: ID!) {
    moveFile(targetId: $targetId, id: $id)
  }
`;