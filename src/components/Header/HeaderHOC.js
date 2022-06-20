import { graphql } from "@apollo/client/react/hoc";
import { GET_ALL_CATEGORIES } from "../../query/categories";

const withGraphQL = graphql(GET_ALL_CATEGORIES);

export default withGraphQL;
