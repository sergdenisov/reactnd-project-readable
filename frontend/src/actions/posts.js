import * as api from '../utils/api';
import { getPostComments } from './comments';

export const SET_POSTS = 'SET_POSTS';
export const PUSH_POST = 'PUSH_POST';
export const CHANGE_POST = 'CHANGE_POST';

export const setPosts = posts => ({
  type: SET_POSTS,
  posts,
});

export const getPosts = category => dispatch => {
  const promise = category ? api.getPostsByCategory(category) : api.getPosts();

  promise.then(posts => {
    dispatch(setPosts(posts));
    posts.forEach(post => dispatch(getPostComments(post.id)));
  });
};

export const pushPost = post => ({
  type: PUSH_POST,
  post,
});

export const addPost = inputData => dispatch =>
  api
    .addPost({
      ...inputData,
      timestamp: Date.now(),
    })
    .then(post => dispatch(pushPost(post)));

export const changePost = post => ({
  type: CHANGE_POST,
  post,
});

export const votePost = data => dispatch =>
  api.votePost(data).then(post => dispatch(changePost(post)));

export const deletePost = postId => dispatch =>
  api.deletePost(postId).then(post => dispatch(changePost(post)));

export const editPost = data => dispatch =>
  api.editPost(data).then(post => dispatch(changePost(post)));

export const getPost = postId => dispatch => {
  api.getPost(postId).then(post => {
    dispatch(changePost(post));
    dispatch(getPostComments(post.id));
  });
};
