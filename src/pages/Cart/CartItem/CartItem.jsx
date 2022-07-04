import React, { Component } from "react";
import InfiniteSlider from "../../../components/InfiniteSlider/InfiniteSlider";
import "./CartItem.scss";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedAttributes: [],
      productAttributes: [],
    };
  }

  searchCurrentAttributeValue(attributeId, attributeValueId) {
    const { pickedAttributes } = this.state;
    const index = pickedAttributes.findIndex((item) => item.attributeId === attributeId);
    if (index === -1) {
      return false;
    } else {
      return pickedAttributes[index].attributeValue === attributeValueId;
    }
  }

  componentDidMount() {
    this.setState({ pickedAttributes: this.props.selectedAttributes });
    this.setState({ productAttributes: this.props.attributes });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.productData !== this.state.productData) {
      this.setState({ productAttributes: this.state.attributes });
      this.setDefaultPickedAttributes();
    }
    if (this.props.currency !== prevProps.currency) {
      this.setState({ productPrice: this.searchCurrentPrice(this.state.productData) });
    }
  }

  render() {
    const { productAttributes } = this.state;

    return (
      <li className="cart__item">
        <div className="item--content">
          <p className="item--brand">{this.props.item.brand}</p>
          <p className="item--title">{this.props.item.title}</p>
          <p className="item--price">{this.props.price}</p>
          {productAttributes &&
            productAttributes.map((attribute, index) => (
              <div key={index} className="product__attributes">
                <div className="attribute">
                  <span className="attribute__label">{attribute.name}</span>
                  <ul className="attribute__list">
                    {attribute.type === "swatch"
                      ? attribute.items.map((item, index) => (
                          <li
                            key={index}
                            className={`attribute__item--color ${
                              this.searchCurrentAttributeValue(attribute.id, item.id) && "attribute__item--color--active"
                            }`}
                            style={{ backgroundColor: item.value }}
                          ></li>
                        ))
                      : attribute.items.map((item, index) => (
                          <li
                            key={index}
                            className={`attribute__item ${
                              this.searchCurrentAttributeValue(attribute.id, item.id) && "attribute__item--active"
                            }`}
                          >
                            {item.value}
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
        <div className="cart__container">
          <div className="item--counter">
            <div
              onClick={() => this.props.onAddItem(this.props.item.id, this.props.item.selectedAttributes)}
              className="counter__btn--plus"
            >
              +
            </div>
            <p className="counter__count">{this.props.item.count}</p>
            <div
              onClick={() => this.props.onRemoveItem(this.props.item.id, this.props.item.selectedAttributes)}
              className="counter__btn--minus"
            >
              -
            </div>
          </div>
          <div className="cart__slider">
            <InfiniteSlider pictures={this.props.item.image} />
          </div>
        </div>
      </li>
    );
  }
}

export default CartItem;
