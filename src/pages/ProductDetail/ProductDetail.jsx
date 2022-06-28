import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import "./ProductDetail.scss";
import ProductDetailHOC from "./ProductDetailHOC";

export class ProductDetail extends Component {
    getItemIdFromUrl() {
        const url = document.location.pathname;
        const itemId = url.split("/")[2];
        return itemId;
    }

    constructor(props) {
        super(props);
        this.state = {
            productID: this.getItemIdFromUrl(),
            productPrice: "",
            productData: [],
            productImages: [],
            currentMainImage: null,
            isLoadingProducts: false,
            productInStock: false
        };
    }

    getCategoryProducts = () => {
        const { data } = this.props;
        const { productID } = this.state;
        this.setState({ isLoadingProducts: true });
        data.fetchMore({
            variables: { productID },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                this.setState({
                    productData: fetchMoreResult.product,
                    isLoadingProducts: false,
                });
                console.log("result", fetchMoreResult);
            },
        });
    };

    searchCurrentPrice(product) {
        console.log("product: ", product);
        const currentLabel = this.props.currency.label;
        console.log("currentLabel: ", currentLabel);
        const index = product.prices.findIndex((item) => item.currency.label === currentLabel);
        return `${this.props.currency.symbol} ${product.prices[index].amount}`;
    }

    onChangeCurrentImage(pictureIndex) {
        this.setState({ currentMainImage: this.state.productImages[pictureIndex] })
    }

    componentDidMount() {
        this.getCategoryProducts();
        console.log(this.props);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.productData !== this.state.productData) {
            this.setState({ productPrice: this.searchCurrentPrice(this.state.productData) });
            this.setState({ productImages: this.state.productData.gallery });
            this.setState({ currentMainImage: this.state.productData.gallery[0] })
            this.setState({ productInStock: this.state.productData.inStock })
        }
    }

    render() {
        const { productData, productPrice, productImages, currentMainImage, productInStock } = this.state;
        return (
            <div className="wrapper">
                {this.state.isLoadingProducts ? (
                    <Loader />
                ) : (
                    <div className="product">
                        <div className="product__image">
                            <div className="image-list">
                                {productImages.map((image, index) => (
                                    <div className="image--prev" onClick={() => this.onChangeCurrentImage(index)} key={index}>
                                        <img key={index} src={image} alt={image} />
                                    </div>
                                ))}
                            </div>
                            <div className="image--main">
                                <img src={currentMainImage} alt={productData.name} />
                            </div>
                        </div>
                        <div className="product__content">
                            <h3 className="product__brand">{productData.brand}</h3>
                            <h5 className="product__title">{productData.name}</h5>
                            <div className="price-container">
                                <p className="price">Price:</p>
                                <p className="price-value">{productPrice}</p>
                            </div>
                            <div className={`product__btn ${!productInStock && 'product__btn--disabled'}`}>{productInStock ? 'Add to cart' : 'Out of stock'}</div>
                            <p className="product__description">
                                Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party
                                dresses from all your favorite brands.
                            </p>
                        </div>
                    </div>)}
            </div>
        );
    }
}

export default ProductDetailHOC(ProductDetail);
