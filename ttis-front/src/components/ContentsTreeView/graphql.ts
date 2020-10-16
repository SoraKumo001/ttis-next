import { gql } from "@apollo/client";


export const CONTENTS_TREE = gql`
  query contentsList {
    contentsList {
      id
      visible
      priority
      title
      page
      parentId
    }
  }
`;
