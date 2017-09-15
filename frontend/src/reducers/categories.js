import { ADD_CATEGORIES } from '../actions/categories';

function categories(state = [], action) {
  switch (action.type) {
    case ADD_CATEGORIES:
      return [...state, ...action.categories];
    default:
      return state;
  }
}

export default categories;
