import { graphql } from "@apollo/client/react/hoc";
import { GET_ALL_CATEGORIES } from "../../query/categories";
import { setCurrency } from "../../store/slices/currency";
import { compose } from "recompose";
import { connect } from "react-redux";

const withGraphQL = graphql(GET_ALL_CATEGORIES);

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer,
  };
};

// export default withGraphQL;
export default compose(withGraphQL, connect(mapStateToProps, { setCurrency }));
