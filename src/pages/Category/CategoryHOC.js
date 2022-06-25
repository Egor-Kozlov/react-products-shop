import { graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCTS_ONE_CATEGORY } from "../../query/productsOneType";
import { compose } from "recompose";
import { connect } from "react-redux";
import { setCurrency } from "../../store/slices/currency";

const withGraphQL = graphql(GET_PRODUCTS_ONE_CATEGORY, {
  options: ({ currentCategory = "" }) => ({
    variables: { currentCategory },
  }),
});

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer,
  };
};

export default compose(withGraphQL, connect(mapStateToProps, { setCurrency }));
