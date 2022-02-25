import {ADD_TO_CART} from "../actions/addToCart";

export function cart(state={ items: [] }, action) {

    switch (action.type) {
      case ADD_TO_CART:
        return {
        
           items: [...state.items, action.product] 
        };
        default:
            return state;
        }
      }