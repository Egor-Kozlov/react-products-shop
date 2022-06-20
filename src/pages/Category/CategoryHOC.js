import { graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCTS_ONE_CATEGORY } from "../../query/productsOneType";

const withGraphQL = graphql(GET_PRODUCTS_ONE_CATEGORY, {
  options: ({ currentCategory = "" }) => ({
    variables: { currentCategory },
  }),
});

// const withGraphQL = graphql(GET_PRODUCTS_ONE_CATEGORY);

export default withGraphQL;
