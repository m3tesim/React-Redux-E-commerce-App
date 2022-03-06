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
               JSON.stringify(i) !== JSON.stringify(action.productID)
             ))] 
          };
  

        case TOTAL_PRICE:
        return {
        ...state,
           price: [ action.price] 
        };


        case PRODUCT_COUNT:
     

         return {
         ...state,
            count:{...state.count,
               [action.productCount.id]: action.productCount.count
              }
         };
        default:
            return state;
        }
      }
    /*  return {
         ...state,
         [qid]: {
           ...state[qid],
           [selected]: {
             ...state[qid][selected],
             votes: state[qid][selected].votes.concat([authed])
           }
         }
       }*/