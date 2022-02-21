import { combineReducers } from "redux";
import { products } from "./productReducer";
import { categories } from "./categoryReducer";
import { currencies } from "./currencyReducer";
import { cart } from "./cartReducer";
export default combineReducers({
    products ,
    categories,
   currencies, 
   cart
   
    
})