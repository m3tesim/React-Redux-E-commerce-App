import {ADD_TO_CART,TOTAL_PRICE} from "../actions/addToCart";

export function cart(state={ items: [] ,price:[]}, action) {

    switch (action.type) {
      case ADD_TO_CART:
        return {
        ...state,
           items: [...state.items, action.product] 
        };

        case TOTAL_PRICE:
        return {
        ...state,
           price: [...state.price, action.price] 
        };
        default:
            return state;
        }
      }