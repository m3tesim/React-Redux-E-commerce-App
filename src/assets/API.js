import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

const myClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

myClient
  .query({
    query: gql`
      query GetProducts {
        category {
          name
          products {
               name,
               brand
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));


  const ALL_PRODUCTS = gql`
  query GetallProducts {
    category {
        name
        products {
             name,
             brand
        }
      }
  }
`;


export {ALL_PRODUCTS,myClient} ;
