import { gql } from "@apollo/client";

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($documentId: ID!, $data: BlogInput!) {
    updateBlog(documentId: $documentId, data: $data) {
      Title
      Body
      Author
    }
  }
`;
