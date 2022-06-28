import React, { Component } from 'react'
import './Category.scss'
import ReduxWithGraphQL from './CategoryHOC';
import bigFirstLetter from '../../modules/bigFirstLetter';
import ProductsList from '../../components/Products/ProductsList/ProductsList';

export class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCategory: '',
            currentProducts: [],
            isLoadingProducts: false,
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
        this.setState({ currentCategory: this.props.currentCategory })
        this.getCategoryProducts()
        console.log(this.state.currentCategory);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentCategory !== this.props.currentCategory) {
            this.setState({ currentCategory: this.props.currentCategory })
        }
        if (prevState.currentCategory !== this.state.currentCategory) {
            this.getCategoryProducts()
        }
    }

    render() {
        return (
            <div className='category'>
                {/* <Header onChangeCurrency={this.onChangeCurrency} onClickCategory={this.onClickCategory} client={this.props.client} currentCategory={this.state.currentCategory} /> */}
                <div className="wrapper">
                    <h2 className='category__title'>{bigFirstLetter(this.state.currentCategory)}</h2>
                    <ProductsList currentCurrency={this.props.currency} loading={this.state.isLoadingProducts} products={this.state.currentProducts} />
                </div>
            </div>
        )
    }
}

export default ReduxWithGraphQL(Category);