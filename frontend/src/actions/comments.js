import * as api from '../utils/api';

export const SET_POST_COMMENTS = 'SET_POST_COMMENTS';

export const setPostComments = data => ({
  type: SET_POST_COMMENTS,
  data,
});

export const getPostComments = postId => dispatch =>
  api
    .getPostComments(postId)
    .then(comments => dispatch(setPostComments({ postId, comments })));
