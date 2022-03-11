
import { getInitialData, _getAllProducts ,getProductsData} from "../assets/API";
import {getProducts} from "./productsAction";
import getCategories from "./categories";
import getCurrency from "./currencyAction";

export function handleInitialData() {
    return (dispatch) => {

      return getInitialData().then(({ categories,currencies}) => {
      //  console.log("from shared "+JSON.stringify(allProducts))

      // dispatch(getProducts(allProducts));
        dispatch(getCategories(categories));
        dispatch(getCurrency(currencies.currencies[0]))

      });
    };
  }

  export function handleProducts() {
    return (dispatch) => {

      return getProductsData().then(({ products}) => {
       //console.log("from shared "+JSON.stringify(allProducts))

       dispatch(getProducts(products));

      });
    };
  }
  
 /* export function handleProductByID(id) {
    return (dispatch) => {

      return getProductsByID(id).then(({ products}) => {
       //console.log("from shared "+JSON.stringify(allProducts))

       dispatch(getProducts(products));

      });
    };
  }*/