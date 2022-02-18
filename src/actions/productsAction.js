import { _getProductsByCategory } from "../assets/API";

export const GET_PRODUCTS = "get_products";
export const PRODUCT_BY_CATEGORY = "productByCategory";

export function getProducts(products) {
  return {
    type: GET_PRODUCTS,
    products,
  };
}



export function getproductByCategory(category) {

  return (dispatch) => {
    return _getProductsByCategory(category).then((products) => {

      dispatch(getProducts(products));
    });
  };
}


