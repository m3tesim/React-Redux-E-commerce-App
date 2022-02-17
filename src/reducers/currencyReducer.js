import { GET_CURRENCY } from "../actions/currencyAction";

export function currencies(state=null, action) {

    switch (action.type) {
      case GET_CURRENCY:
        return {
          ...state,
          ...action.currencies
        };
        default:
            return state;
        }
      }