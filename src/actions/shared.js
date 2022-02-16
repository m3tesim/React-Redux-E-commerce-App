
import { getInitialData } from "../assets/API";
import getProducts from "./productsAction";


export function handleInitialData() {
    return (dispatch) => {
      return getInitialData().then(({ allProducts }) => {
        dispatch(getProducts(allProducts));
       // dispatch(getQuestions(questions));
      });
    };
  }