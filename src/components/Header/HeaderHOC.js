import { graphql } from "@apollo/client/react/hoc";
import { GET_ALL_CATEGORIES } from "../../query/categories";
import { setCurrency } from "../../store/slices/currency";
import { compose } from "recompose";
import { connect } from "react-redux";
import { GET_ALL_CURRENCIES } from "../../query/currencies";
import { setCurrentCategory } from "../../store/slices/currentCategory";

const withGraphQL = graphql(GET_ALL_CATEGORIES, GET_ALL_CURRENCIES);

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer,
    basket: state.basketReducer,
    // currentCategory: state.categoryReducer,
  };
};

// export default withGraphQL;
export default compose(withGraphQL, connect(mapStateToProps, { setCurrency, setCurrentCategory }));
