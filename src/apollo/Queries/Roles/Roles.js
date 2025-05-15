import { gql } from "@apollo/client";

export const ROLES = gql`
  query getAllRoles {
    usersPermissionsRoles {
      documentId
      name
      description
      type
    }
  }
`;
