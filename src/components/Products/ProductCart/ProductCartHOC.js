import { connect } from "react-redux";
import { addToBasket } from "../../../store/slices/basket";

const mapStateToProps = (state) => {
  return {
    basket: state.basketReducer,
  };
};

export default connect(mapStateToProps, { addToBasket });
