import { SET_POSTS, PUSH_POST, CHANGE_POST } from '../actions/posts';
import {
  SET_POST_COMMENTS,
  PUSH_POST_COMMENT,
  CHANGE_POST_COMMENT,
} from '../actions/comments';

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
        return state.filter(post => post.id !== action.post.id);
      }

      if (state.length === 0) {
        return [enrichPost(action.post)];
      }

      return state.map(
        post =>
          post.id === action.post.id
            ? enrichPost(action.post, post.comments)
            : post,
      );
    case SET_POST_COMMENTS:
      return state.map(
        post =>
          post.id === action.data.postId
            ? { ...post, comments: action.data.comments }
            : post,
      );
    case PUSH_POST_COMMENT:
      return state.map(
        post =>
          post.id === action.comment.parentId
            ? { ...post, comments: [...post.comments, action.comment] }
            : post,
      );
    case CHANGE_POST_COMMENT:
      return state.map(post => {
        if (post.id !== action.comment.parentId) {
          return post;
        }

        if (!post.comments.length) {
          return { ...post, comments: [action.comment] };
        }

        if (action.comment.deleted) {
          return {
            ...post,
            comments: post.comments.filter(
              comment => comment.id !== action.comment.id,
            ),
          };
        }

        return {
          ...post,
          comments: post.comments.map(
            comment =>
              comment.id === action.comment.id ? action.comment : comment,
          ),
        };
      });
    default:
      return state;
  }
}

export default posts;
