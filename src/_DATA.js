import { useQuery } from "@apollo/client";




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



  const { loading, error, data } = useQuery(ALL_PRODUCTS);
