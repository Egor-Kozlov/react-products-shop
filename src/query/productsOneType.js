import { gql } from "@apollo/client";

export const GET_PRODUCTS_ONE_CATEGORY = gql`
  query productsOneCategory($name: String) {
    category(input: { title: $name }) {
      products {
        name
        id
      }
    }
  }
`;
