import { gql } from "@apollo/client";

export const CREATE_CONTACT_US = gql`
  mutation CreateContactUs($data: ContactUsInput!) {
    createContactUs(data: $data) {
      Email
      Fullname
      Message
    }
  }
`;
