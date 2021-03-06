import { gql } from '@apollo/client';

export const FRAGMENT_CONTENTS = gql`
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
