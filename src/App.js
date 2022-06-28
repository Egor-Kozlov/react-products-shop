import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Category from "./pages/Category/Category";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./components/Test/Test";
import Header from "./components/Header/Header";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: "",
    };
  }

  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Router>
            <Header
              client={client}
              onChangeCurrentCategory={this.setState.bind(this)}
              currentCategory={this.state.currentCategory}
            />
            <Routes>
              <Route exact path="/" element={<Category client={client} currentCategory={this.state.currentCategory} />} />
              <Route path="/product/:id" element={<ProductDetail client={client} />} />
              <Route path="/cart" element={<Cart client={client} />} />\
            </Routes>
          </Router>
          {/* <Test /> */}
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
