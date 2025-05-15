import { gql } from "@apollo/client";

export const BLOG = gql`
  query getABlog($documentId: ID!, $locale: I18NLocaleCode) {
    blog(documentId: $documentId, locale: $locale) {
      Title
      Body
      Author
      documentId
      createdAt
      Photo {
        url
      }
    }
  }
`;
