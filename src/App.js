import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Category from "./pages/Category/Category";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Category client={client} />
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
