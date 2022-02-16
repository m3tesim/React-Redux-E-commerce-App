import { GET_PRODUCTS } from "../actions/productsAction";


export function products(state=null, action) {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state,
          ...action.products
        };
        default:
            return state;
        }
      }