export const ADD_TO_CART = "add_to_cart";
export const TOTAL_PRICE = "total_price";
export const PRODUCT_COUNT="product_count";
export const REMOVE_PRODUCT="remove_product";


function addToCart(product) {
  return {
    type:ADD_TO_CART,
    product,
  };
}

export function totalPrice(price) {
  return {
    type:TOTAL_PRICE,
    price,
  };
}

export function productCount(productCount) {
  return {
    type:PRODUCT_COUNT,
    productCount,
  };
}


export function removeFromCart(productID) {
  return {
    type:REMOVE_PRODUCT,
    productID,
  };
}





export default addToCart;