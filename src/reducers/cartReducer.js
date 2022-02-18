import {ADD_TO_CART} from "../actions/addToCart";

export function cart(state={}, action) {

    switch (action.type) {
      case ADD_TO_CART:
        return {
        
          ...state,
          [action.product.id] : action.product
        };
        default:
            return state;
        }
      }