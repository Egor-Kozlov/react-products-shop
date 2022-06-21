import React, { Component } from 'react'
import './ProductCart.scss';

export class ProductCart extends Component {
    render() {
        return (
            <li className='products__item' key={this.props.id}>
                <div className='item__image-container'>
                    <img className={`item__image ${!this.props.inStock && 'item__image--disabled'}`} src={this.props.image} alt={this.props.name} />
                    {!this.props.inStock ? <p className='item__out-of-stock'>out of stock</p> : null}
                    {/* <p className='item__out-of-stock'>out of stock</p> */}

                </div>
                <p className={`item__title ${!this.props.inStock && 'item__title--disabled'}`}>{this.props.title}</p>
                <p className={`item__cost ${!this.props.inStock && 'item__cost--disabled'}`}>{this.props.price}</p>
            </li>
        )
    }
}

export default ProductCart