import { gql } from "@apollo/client";

export const DELETE_BLOG = gql`
  mutation DeleteBlog($documentId: ID!) {
    deleteBlog(documentId: $documentId) {
      documentId
    }
  }
`;
