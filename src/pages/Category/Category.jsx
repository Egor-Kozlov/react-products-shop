import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import './Category.scss'
import { gql } from "@apollo/client";
import { graphql } from '@apollo/client/react/hoc';
import { GET_ALL_CATEGORIES } from '../../query/categories';
import { GET_PRODUCTS_ONE_CATEGORY } from '../../query/productsOneType';
import apolloRequest from '../../query/apolloRequest';
import withGraphQL from './CategoryHOC';

export class Category extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: 'ALL',
            currentProducts: [],
        }
    }

    onClickCategory = (categoryName) => {
        console.log(categoryName);
    }

    componentDidMount() {
        const { data } = this.props;
        const { name } = this.state;

        data.fetchMore({
            variables: { name },
            updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
        });
    }

    // getProducts = () => {
    //     apolloRequest(this.props.client, GET_PRODUCTS_ONE_CATEGORY)
    // }

    render() {
        return (
            <div className='category'>
                <Header onClickCategory={this.onClickCategory} client={this.props.client} />
                Category
            </div>
        )
    }
}

export default withGraphQL(Category);