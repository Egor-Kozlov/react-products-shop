import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import './Category.scss'
import { gql } from "@apollo/client";
import { graphql } from '@apollo/client/react/hoc';
import { GET_ALL_CATEGORIES } from '../../query/categories';
import { GET_PRODUCTS_ONE_CATEGORY } from '../../query/productsOneType';
import apolloRequest from '../../query/apolloRequest';
import withGraphQL from './CategoryHOC';
import bigFirstLetter from '../../modules/bigFirstLetter';
import ProductsList from '../../components/Products/ProductsList/ProductsList';
import { connect } from 'react-redux';

export class Category extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentCategory: 'all',
            currentProducts: [],
            isLoadingProducts: false,
            currentCurrency: this.props.currency
        }
    }

    onClickCategory = (categoryName) => {
        this.setState({ currentCategory: categoryName })
    }

    getCategoryProducts = () => {
        const { data } = this.props;
        const { currentCategory } = this.state;
        console.log('currentCategory: ', currentCategory);
        this.setState({ isLoadingProducts: true })
        data.fetchMore({
            variables: { currentCategory },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                this.setState({
                    currentProducts: fetchMoreResult.category.products,
                    isLoadingProducts: false
                })
            },
        });
    }

    componentDidMount() {
        this.setState({ isLoadingProducts: true })
        this.getCategoryProducts()
        this.setState({ currentCurrency: this.props.currency })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentCategory !== this.state.currentCategory) {
            this.getCategoryProducts()
        }
    }

    render() {
        return (
            <div className='category'>
                <Header onChangeCurrency={this.onChangeCurrency} onClickCategory={this.onClickCategory} client={this.props.client} currentCategory={this.state.currentCategory} />
                <div className="wrapper">
                    <h2 className='category__title'>{bigFirstLetter(this.state.currentCategory)}</h2>
                    <ProductsList currentCurrency={this.props.currency} loading={this.state.isLoadingProducts} products={this.state.currentProducts} />
                </div>
            </div>
        )
    }
}

export default withGraphQL(Category);