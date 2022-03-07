import {ADD_TO_CART,TOTAL_PRICE,PRODUCT_COUNT,REMOVE_PRODUCT} from "../actions/addToCart";

export function cart(state={ items: [] ,price:[] , count:{}}, action) {

    switch (action.type) {
      case ADD_TO_CART:
        return {
        ...state,
           items: [...state.items, action.product] 
        };
        case REMOVE_PRODUCT:
          
          return {
          ...state,
             items: [...state.items.filter((i)=>(
               JSON.stringify(i) !== JSON.stringify(action.product)
             ))] 
          };
  

        case TOTAL_PRICE:
        return {
        ...state,
           price: [ action.price] 
        };


        case PRODUCT_COUNT:
     
        const newItems=state.items.filter(i=>(
          JSON.stringify(i.attributes) !== JSON.stringify(action.productCount.attributes)

        ))
          return {
            ...state,
               items:[...newItems,action.productCount]
            };

        default:
            return state;
        }
      }
