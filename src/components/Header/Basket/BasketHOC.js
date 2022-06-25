import { graphql } from "@apollo/client/react/hoc";
import { compose } from "recompose";
import { connect } from "react-redux";
import { GET_BASKET_PRODUCT } from "../../../query/basketProduct";
import { addToBasket, removeFromBasket } from "../../../store/slices/basket";

const withGraphQL = graphql(GET_BASKET_PRODUCT, {
  options: ({ id = "" }) => ({
    variables: { id },
  }),
});

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer,
    basket: state.basketReducer,
  };
};

// export default withGraphQL;
export default compose(withGraphQL, connect(mapStateToProps, { addToBasket, removeFromBasket }));
