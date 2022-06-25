import { gql } from "@apollo/client";

export const GET_BASKET_PRODUCT = gql`
  query getBasketProduct($id: String!) {
    product(id: $id) {
      brand
      name
      gallery
      id
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
