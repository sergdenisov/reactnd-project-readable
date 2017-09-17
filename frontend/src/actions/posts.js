import uuidv4 from 'uuid/v4';
import * as api from '../utils/api';
import { getPostComments } from './comments';

export const SET_POSTS = 'SET_POSTS';
export const ADD_POST = 'SET_POST';
export const EDIT_POST = 'EDIT_POST';

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

export const addPost = post => ({
  type: ADD_POST,
  post,
});

export const postPost = inputData => dispatch =>
  api
    .postPost({
      ...inputData,
      id: uuidv4(),
      timestamp: Date.now(),
    })
    .then(post => dispatch(addPost(post)));

export const editPost = post => ({
  type: EDIT_POST,
  post,
});

export const votePost = data => dispatch =>
  api.votePost(data).then(post => dispatch(editPost(post)));

export const deletePost = postId => dispatch =>
  api.deletePost(postId).then(post => dispatch(editPost(post)));
