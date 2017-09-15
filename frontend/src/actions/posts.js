import uuidv4 from 'uuid/v4';
import * as api from '../utils/api';

export const ADD_POSTS = 'ADD_POSTS';

export const addPosts = posts => ({
  type: ADD_POSTS,
  posts,
});

export const getPosts = () => dispatch =>
  api.getPosts().then(posts => dispatch(addPosts(posts)));

export const postPost = inputData => dispatch =>
  api
    .postPost({
      ...inputData,
      id: uuidv4(),
      timestamp: Date.now(),
    })
    .then(post => dispatch(addPosts([post])));
