import { gql } from "@apollo/client";

export const GET_BASKET_PRODUCT = gql`
  query getBasketProduct($productID: String!) {
    product(id: $productID) {
      brand
      name
      gallery
      id
      inStock
      description
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
    }
  }
`;
