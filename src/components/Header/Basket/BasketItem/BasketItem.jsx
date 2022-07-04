import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./BasketItem.scss";

export class BasketItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedAttributes: [],
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
  }

  render() {
    return (
      <li className="basket__item">
        <div className="item__body">
          <Link to={`/product/${this.props.item.id}`}>
            <p className="item__title">{this.props.item.brand}</p>
            <p className="item__title">{this.props.item.title}</p>
          </Link>
          <p className="item__cost">{this.props.price}</p>
          <ul className="attribute">
            {this.props.attributes.map((attribute, index) => {
              return (
                <li className="attribute__item" key={attribute.name}>
                  <p className="attribute__title">{attribute.name}</p>
                  {attribute.type === "swatch" ? (
                    <ul className="attribute__value-list">
                      {attribute.items.map((item, index) => {
                        return (
                          <li
                            className={`attribute__value--color ${
                              this.searchCurrentAttributeValue(attribute.id, item.id) && "attribute__value--color--active"
                            }`}
                            key={item.value}
                            style={{ backgroundColor: item.value }}
                          ></li>
                        );
                      })}
                    </ul>
                  ) : (
                    <ul className="attribute__value-list">
                      {attribute.items.map((item) => {
                        return (
                          <li
                            className={`attribute__value ${
                              this.searchCurrentAttributeValue(attribute.id, item.id) && "attribute__value--active"
                            }`}
                          >
                            {item.value}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="item__counter">
          <div
            onClick={() => this.props.onAddItem(this.props.item.id, this.props.item.selectedAttributes)}
            className="counter__btn"
          >
            +
          </div>
          <div className="counter__value">{this.props.item.count}</div>
          <div
            onClick={() => this.props.onRemoveItem(this.props.item.id, this.props.item.selectedAttributes)}
            className="counter__btn"
          >
            -
          </div>
        </div>
        <Link to={`/product/${this.props.item.id}`}>
          <div className="item__img">
            <img src={this.props.item.image[0]} alt={this.props.item.title} />
          </div>
        </Link>
      </li>
    );
  }
}

export default BasketItem;
