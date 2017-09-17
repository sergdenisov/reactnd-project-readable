import { ADD_POSTS, EDIT_POST } from '../actions/posts';

function posts(state = [], action) {
  switch (action.type) {
    case ADD_POSTS:
      return [...state, ...action.posts];
    case EDIT_POST:
      return state.map(
        item => (item.id === action.post.id ? action.post : item),
      );
    default:
      return state;
  }
}

export default posts;
