import { gql } from "apollo-boost";


export const QUERY_USERS = gql`
  query Users {
    users {
      id
      name
      info
    }
  }
`;
export const QUERY_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      token
      user {
        name
        info
      }
    }
  }
`;
export const QUERY_LOGIN = gql`
  mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        id
        name
        info
      }
    }
  }
`;
export const MUTATION_CREATE_USER = gql`
  mutation createUser($name: String!, $password: String!, $info: String) {
    createUser(name: $name, password: $password, info: $info) {
      id
      name
      info
    }
  }
`;
export const MUTATION_UPDATE_USER = gql`
  mutation updateUser(
    $id: Int!
    $name: String
    $password: String
    $info: String
  ) {
    updateUser(id: $id, name: $name, password: $password, info: $info) {
      id
      name
      info
    }
  }
`;
export const MUTATION_DELETE_USERS = gql`
  mutation deleteUsers($ids: [Int!]!) {
    deleteUsers(ids: $ids)
  }
`;
