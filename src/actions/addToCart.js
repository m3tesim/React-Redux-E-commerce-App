export const ADD_TO_CART = "add_to_cart";

function addToCart(product) {
  return {
    type:ADD_TO_CART,
    product,
  };
}



export default addToCart;