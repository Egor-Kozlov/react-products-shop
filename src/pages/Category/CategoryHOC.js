import { graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCTS_ONE_CATEGORY } from "../../query/productsOneType";

const withGraphQL = graphql(GET_PRODUCTS_ONE_CATEGORY, {
  options: ({ currentCategory = "all" }) => ({
    variables: { currentCategory },
  }),
});

export default withGraphQL;
