import React, { Component } from 'react'
import InfiniteSlider from '../../../components/InfiniteSlider/InfiniteSlider'
import './CartItem.scss'

export class CartItem extends Component {

    componentDidMount() {
        console.log(this.props.item);
    }

    render() {
        return (
            <li className="cart__item">
                <div className="item--content">
                    <p className='item--brand'>{this.props.item.brand}</p>
                    <p className='item--title'>{this.props.item.title}</p>
                    <p className='item--price'>{this.props.price}</p>
                </div>
                <div className='cart__container'>
                    <div className="item--counter">
                        <div onClick={() => this.props.onAddItem(this.props.item.id)} className="counter__btn--plus">+</div>
                        <p className='counter__count'>{this.props.item.count}</p>
                        <div onClick={() => this.props.onRemoveItem(this.props.item.id)} className="counter__btn--minus">-</div>
                    </div>
                    <div className="cart__slider">
                        <InfiniteSlider pictures={this.props.item.image} />
                    </div>
                </div>
            </li>
        )
    }
}

export default CartItem