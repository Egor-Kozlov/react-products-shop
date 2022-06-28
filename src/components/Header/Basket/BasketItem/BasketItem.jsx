import React, { Component } from 'react'
import './BasketItem.scss'

export class BasketItem extends Component {

    render() {
        return (
            <li className="basket__item">
                <div className="item__body">
                    <p className="item__title">{this.props.item.brand} {this.props.item.title}</p>
                    <p className="item__cost">{this.props.price}</p>
                    <div className="item__size">
                        <p className="size__title">Size:</p>
                        <ul className="size__list">
                            <li className="size__item">XS</li>
                            <li className="size__item">S</li>
                        </ul>
                    </div>
                    <div className="item__color">
                        <p className="color__title">Color:</p>
                        <ul className="color__list">
                            <li className="color__item"></li>
                            <li className="color__item"></li>
                        </ul>
                    </div>
                </div>
                <div className="item__counter">
                    <div onClick={() => this.props.onAddItem(this.props.item.id)} className="counter__btn">+</div>
                    <div className="counter__value">{this.props.item.count}</div>
                    <div onClick={() => this.props.onRemoveItem(this.props.item.id)} className="counter__btn">-</div>
                </div>
                <div className="item__img">
                    <img src={this.props.item.image[0]} alt={this.props.item.title} />
                </div>
            </li>
        )
    }
}

export default BasketItem