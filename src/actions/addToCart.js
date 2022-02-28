export const ADD_TO_CART = "add_to_cart";
export const TOTAL_PRICE = "total_price";

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


export default addToCart;