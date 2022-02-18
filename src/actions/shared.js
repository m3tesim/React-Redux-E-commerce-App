
import { getInitialData } from "../assets/API";
import {getProducts} from "./productsAction";
import getCategories from "./categories";
import getCurrency from "./currencyAction";

export function handleInitialData() {
    return (dispatch) => {

      return getInitialData().then(({ allProducts ,categories,currencies}) => {
        dispatch(getProducts(allProducts));
        dispatch(getCategories(categories));
        dispatch(getCurrency(currencies.currencies[0]))

      });
    };
  }