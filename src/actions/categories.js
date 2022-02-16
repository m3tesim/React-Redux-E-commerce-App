
export const GET_CATEGORIES = "get_category";

function getCategories(categories) {
  return {
    type:GET_CATEGORIES,
    categories,
  };
}



export default getCategories;