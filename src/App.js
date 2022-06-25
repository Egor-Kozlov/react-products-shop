import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Category from "./pages/Category/Category";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./components/Test/Test";
import Header from "./components/Header/Header";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Header />
          <Router>
            <Routes>
              <Route exact path="/" element={<Category client={client} />} />
            </Routes>
          </Router>
          {/* <Test /> */}
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
