import { gql } from "@apollo/client";

export const GET_PRODUCTS_ONE_CATEGORY = gql`
  query productsOneCategory($currentCategory: String!) {
    category(input: { title: $currentCategory }) {
      products {
        name
        id
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

// export const GET_PRODUCTS_ONE_CATEGORY = gql`
//   query {
//     category {
//       products {
//         name
//         id
//       }
//     }
//   }
// `;
