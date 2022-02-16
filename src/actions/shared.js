
import { getInitialData } from "../assets/API";
import getProducts from "./productsAction";
import getCategories from "./categories";

export function handleInitialData() {
    return (dispatch) => {

      return getInitialData().then(({ allProducts ,categories}) => {
        dispatch(getCategories(categories))
        dispatch(getProducts(allProducts));
       // dispatch(getQuestions(questions));
      });
    };
  }