import { combineReducers } from "redux";
import { products } from "./productReducer";
import { categories } from "./categoryReducer";
import { currencies } from "./currencyReducer";
import { loadingBarReducer } from 'react-redux-loading-bar'
export default combineReducers({
    products ,
    categories,
   loadingBar: loadingBarReducer,
   currencies, 
   
    
})