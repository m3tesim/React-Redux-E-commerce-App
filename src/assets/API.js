import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const myClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

//  Graphql quereis

const ALL_PRODUCTS = gql`
  query GetAllProducts {
    category{
      name
      products {
        name
        brand
      }
    }
  }
`;

const PRODUCT_BY_CATEGORY = gql`
  query GetProductByCategory($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        brand
        inStock
        description
        gallery

        attributes {
          id
          name
          type
          items {
            id
            value
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
}`;



export function _getProductsByCategory(category) {
  return new Promise((res, rej) => {
    setTimeout(
      () =>
        res(
          myClient
            .query({ query: PRODUCT_BY_CATEGORY, variables: { title: category } })
            .then((result) => result.data)
        ),
      1000
    );
  });
}

//  using the quereis above to get data and export it to the redux actions

export function _getAllProducts(category) {
  return new Promise((res, rej) => {
    setTimeout(
      () =>
        res(
          myClient
            .query({ query: ALL_PRODUCTS, variables: { title: category } })
            .then((result) => result.data)
        ),
      1000
    );
  });
}

export function getInitialData() {
  return Promise.all([_getAllProducts(),]).then(([allProducts]) => ({
    allProducts,
  }));

}
