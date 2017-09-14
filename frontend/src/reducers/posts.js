import { RECEIVE_POSTS, SORT_POSTS_BY } from '../actions/posts';
import * as sortOptions from '../utils/sortOptions';

const defaultState = {
  items: [],
  sortBy: sortOptions.getDefault(),
};

function posts(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        items: [...state.items, ...action.posts],
      };
    case SORT_POSTS_BY:
      return {
        ...state,
        sortBy: action.sortBy,
      };
    default:
      return state;
  }
}

export default posts;
