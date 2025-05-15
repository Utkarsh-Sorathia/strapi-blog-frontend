import { gql } from "@apollo/client";

export const LOCALES = gql`
  query I18NLocales {
    i18NLocales {
      name
      code
    }
  }
`;
