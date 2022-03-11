import { _getProductsByCategory ,_getProductsById,_getAllProducts} from "../assets/API";

export const GET_PRODUCTS = "get_products";
export const PRODUCT_BY_CATEGORY = "productByCategory";
export const GET_PRODUCT_BYID="get_product_byId"

export function getProducts(products) {
  return {
    type: GET_PRODUCTS,
    products,
  };
}

export function getProductByID(product) {
  return {
    type: GET_PRODUCT_BYID,
    product,
  };
}


export function getAllProducts() {
  return (dispatch) => {

    return _getAllProducts().then(({ products}) => {
     //console.log("from shared "+JSON.stringify(allProducts))

     dispatch(getProducts(products));

    });
  };
}

export function getproductByCategory(category) {

  return (dispatch) => {
    return _getProductsByCategory(category).then((products) => {

      dispatch(getProducts(products));
    });
  };
}


export function getProductById(id) {
  return (dispatch) => {
    return _getProductsById(id).then((product) => {

      dispatch(getProductByID(product));
    });
  };
}
