import React, { Component } from "react";
import "./Basket.scss";
import ReduxWithGraphQL from "./BasketHOC";
import BasketItem from "./BasketItem/BasketItem";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import itemsQuantity from "../../../modules/itemsQuantity";

export class Basket extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.setState({ totalPrice: this.calcTotal() });
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.disableBasket();
    }
  }

  onAddItem(id, selectedAttributes) {
    this.props.addToBasket({ id, selectedAttributes });
  }

  onRemoveItem(id, selectedAttributes) {
    this.props.removeFromBasket({ id, selectedAttributes });
  }

  searchCurrentPrice(product) {
    const currentLabel = this.props.currency.label;
    const index = product.prices.findIndex((item) => item.currency.label === currentLabel);
    return `${this.props.currency.symbol} ${product.prices[index].amount}`;
  }

  calcTotal() {
    const currentLabel = this.props.currency.label;
    const sum = this.props.basket.reduce((accum, item) => {
      const index = item.prices.findIndex((item) => item.currency.label === currentLabel);
      return accum + item.count * item.prices[index].amount;
    }, 0);
    return sum.toFixed(2);
  }

  render() {
    return (
      <div ref={this.setWrapperRef} className="basket">
        {this.props.basket.length > 0 ? (
          <>
            <h4 className="basket__title">
              My Bag, <span className="basket__title--light">{itemsQuantity(this.props.basket)} items</span>
            </h4>
            <ul className="basket__list">
              {this.props.basket.map((item) => (
                <BasketItem
                  key={item.id}
                  item={item}
                  onRemoveItem={this.onRemoveItem.bind(this)}
                  onAddItem={this.onAddItem.bind(this)}
                  price={this.searchCurrentPrice(item)}
                  attributes={item.attributes}
                  selectedAttributes={item.selectedAttributes}
                />
              ))}
            </ul>
            <div className="basket__price">
              <p>Total</p>
              <p>
                {this.props.currency.symbol}
                {this.calcTotal()}
              </p>
            </div>
            <div className="basket__buttons--container">
              <Link to={"/cart"}>
                <div className="btn--view">View bag</div>
              </Link>
              <Link to={"/cart"}>
                <div className="btn--check-out">Check out</div>
              </Link>
            </div>
          </>
        ) : (
          <p className="basket__empty">Add something to me :)</p>
        )}
      </div>
    );
  }
}

export default ReduxWithGraphQL(Basket);
