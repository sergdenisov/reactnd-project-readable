import * as API from '../utils/API';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const fetchPosts = () => dispatch =>
  API.fetchPosts().then(posts => dispatch(receivePosts(posts)));
