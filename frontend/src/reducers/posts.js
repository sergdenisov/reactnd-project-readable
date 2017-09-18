import { SET_POSTS, PUSH_POST, CHANGE_POST } from '../actions/posts';
import { SET_POST_COMMENTS } from '../actions/comments';

function enrichPost(post, comments = []) {
  return { comments, ...post };
}

function posts(state = [], action) {
  switch (action.type) {
    case SET_POSTS:
      return action.posts.map(post => enrichPost(post));
    case PUSH_POST:
      return [...state, enrichPost(action.post)];
    case CHANGE_POST:
      if (action.post.deleted) {
        return state.filter(item => item.id !== action.post.id);
      }

      if (state.length === 0) {
        return [enrichPost(action.post)];
      }

      return state.map(
        item =>
          item.id === action.post.id
            ? enrichPost(action.post, item.comments)
            : item,
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
