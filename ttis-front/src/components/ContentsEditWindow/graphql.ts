import { gql } from "apollo-boost";
const FRAGMENT_CONTENTS = gql`
  fragment FragmentContents on Contents {
    id
    priority
    visible
    page
    title_type
    title
    value_type
    value
    parentId
    createAt
    updateAt
  }
`;
export const QUERY_CONTENTS = gql`
  ${FRAGMENT_CONTENTS}
  query contents($id: ID!) {
    contents(id: $id) {
      ...FragmentContents
    }
  }
`;
export const UPDATE_CONTENTS = gql`
  ${FRAGMENT_CONTENTS}
  mutation updateContents(
    $id: ID!
    $page: Boolean
    $visible: Boolean
    $title_type: Int
    $title: String
    $parent: ID
    $value_type: String
    $value: String
  ) {
    updateContents(
      id: $id
      page: $page
      visible: $visible
      title_type: $title_type
      title: $title
      parent: $parent
      value_type: $value_type
      value: $value
    ) {
      ...FragmentContents
    }
  }
`;