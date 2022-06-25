import React, { Component } from 'react'
import './ProductCart.scss';
import Cart from '../../../pictures/icons/shopping-cart-card.svg'
import Redux from './ProductCartHOC';

export class ProductCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mouseOver: false
        };
    }

    onCartMouse = () => {
        this.setState({ mouseOver: true })
        console.log(this.props);
    }

    onCartMouseOut = () => {
        this.setState({ mouseOver: false })
    }

    onAddToBasket = (product) => {
        this.props.addToBasket({
            id: product.id,
            title: product.title,
            brand: product.brand,
            image: product.image,
            prices: product.prices,
            attributes: product.attributes
        })
    }

    render() {
        return (
            <li onMouseOver={this.onCartMouse} onMouseOut={this.onCartMouseOut} className='products__item' key={this.props.id}>
                <div className='item__image-container'>
                    <img className={`item__image ${!this.props.inStock && 'item__image--disabled'}`} src={this.props.image} alt={this.props.name} />
                    {!this.props.inStock ? <p className='item__out-of-stock'>out of stock</p> : null}
                    {this.props.inStock &&
                        <div onClick={() => this.onAddToBasket(this.props)} className='item__cart-btn'>
                            <img className='cart-btn__image' src={Cart} alt="button cart" />
                        </div>
                    }
                </div>
                <p className={`item__title ${!this.props.inStock && 'item__title--disabled'}`}>{this.props.brand} {this.props.title}</p>
                <p className={`item__cost ${!this.props.inStock && 'item__cost--disabled'}`}>{this.props.price}</p>
            </li>
        )
    }
}

export default Redux(ProductCart) 