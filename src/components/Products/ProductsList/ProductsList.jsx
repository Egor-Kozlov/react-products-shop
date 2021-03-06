import React, { Component } from "react";
import Loader from "../../Loader/Loader";
import ProductCart from "../ProductCart/ProductCart";
import "./ProductsList.scss";

export class ProductsList extends Component {
  searchCurrentPrice(product) {
    const currentLabel = this.props.currentCurrency.label;
    const index = product.prices.findIndex((item) => item.currency.label === currentLabel);
    return `${this.props.currentCurrency.symbol}${product.prices[index].amount}`;
  }

  render() {
    return (
      <div className="products">
        <ul className="products__list">
          {this.props.loading && <Loader />}
          {this.props.products.map((product) => {
            return (
              <ProductCart
                key={product.id}
                id={product.id}
                title={product.name}
                brand={product.brand}
                image={product.gallery}
                price={this.searchCurrentPrice(product)}
                prices={product.prices}
                inStock={product.inStock}
                attributes={product.attributes}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ProductsList;
