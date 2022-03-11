import { combineReducers } from "redux";
import { products ,productByID} from "./productReducer";
import { categories } from "./categoryReducer";
import { currencies } from "./currencyReducer";
import { cart } from "./cartReducer";
export default combineReducers({
  products,
  productByID,
  categories,
  currencies,
  cart,
});
