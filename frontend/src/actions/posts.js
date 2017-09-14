import * as api from '../utils/api';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SORT_POSTS_BY = 'SORT_POSTS_BY';

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const loadPosts = () => dispatch =>
  api.fetchPosts().then(posts => dispatch(receivePosts(posts)));

export const sortPostsBy = sortBy => ({
  type: SORT_POSTS_BY,
  sortBy,
});
