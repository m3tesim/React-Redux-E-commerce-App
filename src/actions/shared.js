
import { getInitialData,getProductsData} from "../assets/API";
import {getProducts} from "./productsAction";
import getCategories from "./categories";
import getCurrency from "./currencyAction";

export function handleInitialData() {
    return (dispatch) => {

      return getInitialData().then(({ categories,currencies}) => {
     
        dispatch(getCategories(categories));
        dispatch(getCurrency(currencies.currencies[0]))

      });
    };
  }

  export function handleProducts() {
    return (dispatch) => {

      return getProductsData().then(({ products}) => {

       dispatch(getProducts(products));

      });
    };
  }
  
