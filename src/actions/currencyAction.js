
export const GET_CURRENCY = "get_currency";

function getCurrency(currencies) {
  return {
    type:GET_CURRENCY,
    currencies,
  };
}



export default getCurrency;