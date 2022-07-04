import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import "./ProductDetail.scss";
import ProductDetailHOC from "./ProductDetailHOC";
import parse from "html-react-parser";

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
      productInStock: false,
      pickedAttributes: [],
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
      },
    });
  };

  searchCurrentPrice(product) {
    const currentLabel = this.props.currency.label;
    const index = product.prices.findIndex((item) => item.currency.label === currentLabel);
    return `${this.props.currency.symbol} ${product.prices[index].amount}`;
  }

  onChangeCurrentImage(pictureIndex) {
    this.setState({ currentMainImage: this.state.productImages[pictureIndex] });
  }

  setDefaultPickedAttributes = () => {
    const { productData } = this.state;
    const pickedAttributes = productData.attributes.map((item) => {
      return {
        attributeId: item.id,
        attributeValue: item.items[0].id,
      };
    });
    this.setState({ pickedAttributes });
  };

  onSetPickedAttributes = (selectedAttribute) => {
    const pickedAttributes = [...this.state.pickedAttributes];
    const index = pickedAttributes.findIndex((item) => item.attributeId === selectedAttribute.attributeId);
    if (index === -1) {
      pickedAttributes.push(selectedAttribute);
    } else {
      pickedAttributes[index] = selectedAttribute;
    }
    this.setState({ pickedAttributes });
  };

  searchCurrentAttributeValue(attributeId, attributeValueId) {
    const { pickedAttributes } = this.state;
    const index = pickedAttributes.findIndex((item) => item.attributeId === attributeId);
    if (index === -1) {
      return false;
    } else {
      return pickedAttributes[index].attributeValue === attributeValueId;
    }
  }

  onAddToBasket() {
    const { productData } = this.state;
    this.props.addToBasket({
      id: productData.id,
      title: productData.name,
      brand: productData.brand,
      image: productData.gallery,
      prices: productData.prices,
      attributes: productData.attributes,
      selectedAttributes: this.state.pickedAttributes,
    });
  }

  componentDidMount() {
    this.getCategoryProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.productData !== this.state.productData) {
      this.setState({ productPrice: this.searchCurrentPrice(this.state.productData) });
      this.setState({ productImages: this.state.productData.gallery });
      this.setState({ currentMainImage: this.state.productData.gallery[0] });
      this.setState({ productInStock: this.state.productData.inStock });
      this.setState({ productAttributes: this.state.productData.attributes });
      this.setDefaultPickedAttributes();
    }
    if (this.props.currency !== prevProps.currency) {
      this.setState({ productPrice: this.searchCurrentPrice(this.state.productData) });
    }
  }

  render() {
    const { productData, productPrice, productImages, currentMainImage, productInStock, productAttributes } = this.state;
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
              {productAttributes &&
                productAttributes.map((attribute, index) => (
                  <div key={index} className="product__attributes">
                    <div className="attribute">
                      <span className="attribute__label">{attribute.name}</span>
                      <ul className="attribute__list">
                        {attribute.type === "swatch"
                          ? attribute.items.map((item, index) => (
                              <li
                                onClick={() => this.onSetPickedAttributes({ attributeId: attribute.id, attributeValue: item.id })}
                                key={index}
                                className={`attribute__item--color ${
                                  this.searchCurrentAttributeValue(attribute.id, item.id) && "attribute__item--color--active"
                                }`}
                                style={{ backgroundColor: item.value }}
                              ></li>
                            ))
                          : attribute.items.map((item, index) => (
                              <li
                                onClick={() => this.onSetPickedAttributes({ attributeId: attribute.id, attributeValue: item.id })}
                                key={index}
                                className={`attribute__item ${
                                  this.searchCurrentAttributeValue(attribute.id, item.id) && "attribute__item--active"
                                }`}
                              >
                                {item.value}
                              </li>
                            ))}
                      </ul>
                    </div>
                  </div>
                ))}
              <div className="price-container">
                <p className="price">Price:</p>
                <p className="price-value">{productPrice}</p>
              </div>
              {productInStock ? (
                <div className="product__btn" onClick={() => this.onAddToBasket()}>
                  Add to cart
                </div>
              ) : (
                <div className="product__btn product__btn--disabled">Out of stock</div>
              )}
              <p className="product__description">{parse(`${this.state.productData.description}`)}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductDetailHOC(ProductDetail);
