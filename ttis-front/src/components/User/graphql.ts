import gql from "graphql-tag";

export const QUERY_USERS = gql`
  query Users {
    users {
      id
      name
      info
    }
  }
`;

export const MUTATION_USER = gql`
  mutation createUser($name: String, $password: String) {
    user(name: $name, password: $password) {
      id
      name
      info
    }
  }
`;
export const MUTATION_DELETE_USERS = gql`
  mutation deleteUsers($ids: [Int!]!) {
    deleteUsers(ids:$ids)
  }
`;