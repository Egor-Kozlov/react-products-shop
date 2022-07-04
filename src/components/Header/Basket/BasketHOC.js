import { graphql } from "@apollo/client/react/hoc";
import { compose } from "recompose";
import { connect } from "react-redux";
import { GET_BASKET_PRODUCT } from "../../../query/basketProduct";
import { addToBasket, removeFromBasket } from "../../../store/slices/basket";

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer,
    basket: state.basketReducer,
  };
};

// export default withGraphQL;
export default connect(mapStateToProps, { addToBasket, removeFromBasket });
