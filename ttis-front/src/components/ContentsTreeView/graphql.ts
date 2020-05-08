import { gql } from "apollo-boost";


export const CONTENTS_TREE = gql`
  query contentsList {
    contentsList {
      id
      visible
      title
      page
      parentId
    }
  }
`;
