import React, { Component } from 'react'

export class ProductCart extends Component {
    render() {
        return (
            <li className='products__item' key={this.props.id}>
                <img className='item__image' src={this.props.image} alt={this.props.name} />
                <p className='item__title'>{this.props.title}</p>
                <p className='item__cost'>{this.props.price}</p>
            </li>
        )
    }
}

export default ProductCart