import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const myClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

//  Graphql quereis

const All_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
      products {
        id
        name
        category
      }
    }
  }
`;

const ALL_PRODUCTS = gql`
  query GetAllProducts {
    category {
      name
      products {
        id
        name
        brand
        inStock
        description
        gallery
        category

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
  }
`;

const PRODUCT_BY_ID = gql`
  query GetProductById($id: String!) {
    product(id: $id) {
      id
      name
      brand
      inStock
      description
      gallery
      category

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
`;

const CURRENCIES = gql`
  query GetCurrency {
    currencies {
      label
      symbol
    }
  }
`;

//  using the quereis above to get data and export it to the redux actions

export function _getAllProducts() {
  return new Promise((res, rej) => {
    setTimeout(
      () =>
        res(
          myClient.query({ query: ALL_PRODUCTS }).then((result) => result.data)
        ),
      1000
    );
  });
}

export function _getCategories() {
  return new Promise((res, rej) => {
    setTimeout(
      () =>
        res(
          myClient
            .query({ query: All_CATEGORIES })
            .then((result) => result.data)
        ),
      1000
    );
  });
}

export function _getCurrencies() {
  return new Promise((res, rej) => {
    setTimeout(
      () =>
        res(
          myClient.query({ query: CURRENCIES }).then((result) => result.data)
        ),
      1000
    );
  });
}

export function getInitialData() {
  return Promise.all([_getAllProducts(), _getCategories(),_getCurrencies()]).then(
    ([allProducts, categories,currencies]) => (
      {
      allProducts,
      categories,
      currencies
    })
  );
}

export function _getProductsByCategory(category) {

  return new Promise((res, rej) => {
    setTimeout(
      () =>
        res(
          myClient
            .query({
              query: PRODUCT_BY_CATEGORY,
              variables: { title: category },
            })
            .then((result) => result.data)
        ),
      1000
    );
  });
}

export function _getProductsById(id) {
  return new Promise((res, rej) => {
    setTimeout(
      () =>
        res(
          myClient
            .query({ query: PRODUCT_BY_ID, variables: { id } })
            .then((result) => result.data)
        ),
      1000
    );
  });
}
