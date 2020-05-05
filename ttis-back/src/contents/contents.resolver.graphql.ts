import { gql } from 'apollo-boost';

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
  query contentsList($id: ID, $level: Int, $visible: Boolean) {
    contentsList(id: $id, level: $level, visible: $visible) {
      ...FragmentContents
    }
  }
`;
export const CREATE_CONTENTS = gql`
  ${FRAGMENT_CONTENTS}
  mutation createContents(
    $parent: ID
    $vector: ContentsVector
    $page: Boolean
    $visible: Boolean
    $title_type: Int
    $title: String
    $value_type: String
    $value: String
  ) {
    createContents(
      parent: $parent
      vector: $vector
      page: $page
      visible: $visible
      title_type: $title_type
      title: $title
      value_type: $value_type
      value: $value
    ) {
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
