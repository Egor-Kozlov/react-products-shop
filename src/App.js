import React, { Component } from "react";
import "./App.css";
import Category from "./pages/Category/Category";
import { GET_ALL_CATEGORIES } from "./query/categories";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: GET_ALL_CATEGORIES,
//   })
//   .then((result) => console.log(result));

class App extends Component {
  // get categories from apollo client

  render() {
    return (
      <ApolloProvider client={client}>
        <Category client={client} />;
      </ApolloProvider>
    );
  }
}

export default App;
