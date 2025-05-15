import { gql } from "@apollo/client";

export const BLOGS = gql`
  query getAllBlogs($locale: I18NLocaleCode)  {
    blogs(locale: $locale) {
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