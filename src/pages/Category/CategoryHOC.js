import { graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCTS_ONE_CATEGORY } from "../../query/productsOneType";
import { compose } from "recompose";
import { connect } from "react-redux";
import basket from "../../store/slices/basket";
import { setCurrency } from "../../store/slices/currency";

const withGraphQL = graphql(GET_PRODUCTS_ONE_CATEGORY, {
  options: ({ currentCategory = "" }) => ({
    variables: { currentCategory },
  }),
});

// const withGraphQL = graphql(GET_PRODUCTS_ONE_CATEGORY);

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer,
  };
};

export default compose(withGraphQL, connect(mapStateToProps, { setCurrency }));
