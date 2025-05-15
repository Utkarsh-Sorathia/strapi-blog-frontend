import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation CreateBlog($data: BlogInput!) {
    createBlog(data: $data) {
      Author
      Body
      Title
    }
  }
`;
