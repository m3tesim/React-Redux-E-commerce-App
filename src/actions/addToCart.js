export const ADD_TO_CART = "add_to_cart";
export const TOTAL_PRICE = "total_price";
export const PRODUCT_COUNT="product_count";

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



export default addToCart;