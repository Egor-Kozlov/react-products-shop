import React, { Component } from 'react'
import Loader from '../../Loader/Loader';
import ProductCart from '../ProductCart/ProductCart';
import "./ProductsList.scss";

export class ProductsList extends Component {

    componentDidMount() {
        console.log(this.props.products);
    }

    render() {
        return (
            <div className='products'>
                <ul className='products__list'>
                    {this.props.loading && <Loader />}
                    {this.props.products.map((product) => {
                        return <ProductCart
                            key={product.id}
                            id={product.id}
                            title={product.name}
                            image={product.gallery[0]}
                        // price={product.prices.currency.label}
                        />
                    })}
                </ul>
            </div>
        )
    }
}

export default ProductsList