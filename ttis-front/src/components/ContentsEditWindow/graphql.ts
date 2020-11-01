import { gql } from '@apollo/client';
import { FRAGMENT_CONTENTS } from 'src/graphql';

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
export const DELETE_CONTENTS = gql`
  mutation deleteContents($id: ID!) {
    deleteContents(id: $id)
  }
`;

export const VECTOR_CONTENTS = gql`
  mutation vectorContents($id: ID!, $vector: Int!) {
    vectorContents(id: $id, vector: $vector) {
      id
      priority
    }
  }
`;
