import { gql } from "@apollo/client";

export const GET_PRODUCTS_ONE_CATEGORY = gql`
  query productsOneCategory($currentCategory: String!) {
    category(input: { title: $currentCategory }) {
      products {
        name
        id
        inStock
        brand
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        gallery
      }
    }
  }
`;
