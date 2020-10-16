import { gql } from "@apollo/client";
import { FRAGMENT_CONTENTS } from "src/graphql";

export const QUERY_CONTENTS_PAGE = gql`
  ${FRAGMENT_CONTENTS}
  query contentsPage($id: ID) {
    contentsList(id: $id, page: true) {
      ...FragmentContents
    }
  }
`;
