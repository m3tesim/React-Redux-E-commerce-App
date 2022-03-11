import { GET_PRODUCTS, GET_PRODUCT_BYID } from "../actions/productsAction";


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


      export function productByID(state=null, action) {
        switch (action.type) {
       
            case GET_PRODUCT_BYID:
              return {
                ...state,
                ...action.product
              };
           
           
            default:
                return state;
            }
          }