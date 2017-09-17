import { SET_POSTS, ADD_POST, EDIT_POST } from '../actions/posts';
import { SET_POST_COMMENTS } from '../actions/comments';

function enrichPost(post) {
  return { comments: [], ...post };
}

function posts(state = [], action) {
  switch (action.type) {
    case SET_POSTS:
      return action.posts.map(post => enrichPost(post));
    case ADD_POST:
      return [...state, enrichPost(action.post)];
    case EDIT_POST:
      if (action.post.deleted) {
        return state.filter(item => item.id !== action.post.id);
      }

      return state.map(
        item => (item.id === action.post.id ? enrichPost(action.post) : item),
      );
    case SET_POST_COMMENTS:
      return state.map(
        item =>
          item.id === action.data.postId
            ? { ...item, comments: action.data.comments }
            : item,
      );
    default:
      return state;
  }
}

export default posts;
