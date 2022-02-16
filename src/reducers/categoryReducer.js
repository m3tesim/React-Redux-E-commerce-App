import GET_CATEGORIES from "../actions/categories";

export function categories(state=[], action) {
    switch (action.type) {
      case GET_CATEGORIES:
        return {
          ...state,
          ...action.categories
        };
        default:
            return state;
        }
      }