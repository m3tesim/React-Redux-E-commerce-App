import { combineReducers } from "redux";
import { products } from "./productReducer";
import { loadingBarReducer } from 'react-redux-loading-bar'
export default combineReducers({
    products ,
    loadingBar: loadingBarReducer, 
    
})