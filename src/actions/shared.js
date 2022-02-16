
import { getInitialData } from "../assets/API";
import getProducts from "./productsAction";
import getCategories from "./categories";

export function handleInitialData() {
    return (dispatch) => {

      return getInitialData().then(({ allProducts ,categories}) => {
      //  console.log("shared.js "+JSON.stringify(categories));
        dispatch(getProducts(allProducts));
        dispatch(getCategories(categories));

      });
    };
  }