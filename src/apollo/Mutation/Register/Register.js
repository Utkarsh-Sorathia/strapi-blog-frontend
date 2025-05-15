import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUsersPermissionsUser($data: UsersPermissionsUserInput!) {
    createUsersPermissionsUser(data: $data) {
      data {
        documentId
        username
        password
        email
        confirmed
        blocked
        role {
          documentId
          type
        }
      }
    }
  }
`;
