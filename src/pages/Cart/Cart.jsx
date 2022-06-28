import React, { Component } from 'react'
import calcTax from '../../modules/calcTax';
import itemsQuantity from '../../modules/itemsQuantity';
import './Cart.scss'
import CartHOC from './CartHOC'
import CartItem from './CartItem/CartItem';

export class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taxValue: 0,
        };
    }

    componentDidMount() {
        console.log(this.props);
    }

    searchCurrentPrice(product) {
        const currentLabel = this.props.currency.label;
        const index = product.prices.findIndex((item) => item.currency.label === currentLabel);
        return `${this.props.currency.symbol} ${product.prices[index].amount}`;
    }

    onAddItem(id) {
        this.props.addToBasket({ id });
        console.log(this.props);
    }

    onRemoveItem(id) {
        console.log(this.props);
        this.props.removeFromBasket({ id });
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
            <div className="wrapper">
                <h2 className='cart__title'>Cart</h2>
                {this.props.basket.length > 0 ? (<ul className="cart__list">
                    {this.props.basket.map((item) => {
                        return (
                            <CartItem
                                item={item}
                                key={item.id}
                                price={this.searchCurrentPrice(item)}
                                onRemoveItem={this.onRemoveItem.bind(this)}
                                onAddItem={this.onAddItem.bind(this)}
                            />
                        )
                    }
                    )}
                </ul>) : <p className='cart__empty'>Your cart is empty</p>}
                <div className="result">
                    <div className="result__container">
                        <ul className='result__list'>
                            <li className="result__item">
                                Tax 21%:
                            </li>
                            <li className="result__item">
                                Quantity:
                            </li>
                            <li className="result__item">
                                Total:
                            </li>
                        </ul>
                        <ul className='result__list'>
                            <li className="result__item">
                                <span className='result--value'>{this.props.currency.symbol}{calcTax(this.calcTotal(), 21).toFixed(2)}</span>
                            </li>
                            <li className="result__item">
                                <span className='result--value'>{itemsQuantity(this.props.basket)}</span>
                            </li>
                            <li className="result__item">
                                <span className='result--value'>{this.props.currency.symbol}{this.calcTotal()}</span>
                            </li>
                        </ul>
                    </div>
                    <div className={`result__btn ${!this.props.basket.length > 0 && 'result__btn--disabled'}`}>Order</div>
                </div>
            </div>
        )
    }
}

export default CartHOC(Cart)