import React, { Component } from "react";
import "./Header.scss";
import Logo from "./../../pictures/icons/main-logo.svg";
import Cart from "./../../pictures/icons/shopping-cart-empty.svg";
import CustomSelect from "./CustomSelect/CustomSelect";
import { GET_ALL_CATEGORIES } from "../../query/categories";
import { GET_ALL_CURRENCIES } from "../../query/currencies";
import apolloRequest from "../../query/apolloRequest";
import ReduxWithGraphQL from "./HeaderHOC";
import Basket from "./Basket/Basket";

export class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            showList: false,
            defaultValue: "$",
            currenciesList: [],
            showBasket: false,
            // basketCount: this.props.basket.length,
        };
    }

    getCategories = () => {
        apolloRequest(this.props.client, GET_ALL_CATEGORIES).then((result) => this.setState({ categories: result.data.categories }));
    };

    getCurrencies = () => {
        apolloRequest(this.props.client, GET_ALL_CURRENCIES).then((result) =>
            this.setState({ currenciesList: result.data.currencies })
        );
    };

    //set current currency to store
    onChangeCurrency = (label, symbol) => {
        this.props.setCurrency({
            label: label,
            symbol: symbol,
        });
        console.log(this.props.currency);
    };

    componentDidMount() {
        this.getCategories();
        this.getCurrencies();
        console.log(this.props);
    }

    render() {
        return (
            <header className="header">
                <div className="wrapper">
                    <nav className="categories">
                        <ul className="categories__list">
                            {this.state.categories.map((category) => {
                                return (
                                    <li
                                        onClick={(e) => this.props.onClickCategory(e.target.innerText.toLowerCase())}
                                        className={`categories__item ${this.props.currentCategory === category.name && "categories__item--active"}`}
                                        key={category.name}
                                    >
                                        {category.name}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <div className="header__logo">
                        <img src={Logo} alt="logo" />
                    </div>
                    <div className="header__actions">
                        <CustomSelect
                            onChangeCurrency={this.onChangeCurrency}
                            defaultText={this.state.defaultValue}
                            optionsList={this.state.currenciesList}
                        />
                        <div className="cart" onClick={() => this.setState({ showBasket: !this.state.showBasket })}>
                            <img className="cart__img" src={Cart} alt="cart" />
                            {this.props.basket.length > 0 ? <div className="cart__counter">{this.props.basket.length}</div> : null}
                        </div>
                    </div>
                    {this.state.showBasket && <Basket disableBasket={() => this.setState({ showBasket: false })} />}
                </div>
            </header>
        );
    }
}

export default ReduxWithGraphQL(Header);
