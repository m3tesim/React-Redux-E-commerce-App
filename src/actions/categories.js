
export const GET_CATEGORIES = "get_categories";

function getCategories(categories) {
  return {
    type:GET_CATEGORIES,
    categories,
  };
}



export default getCategories;