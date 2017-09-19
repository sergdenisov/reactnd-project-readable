import * as api from '../utils/api';

export const SET_POST_COMMENTS = 'SET_POST_COMMENTS';
export const PUSH_POST_COMMENT = 'PUSH_POST_COMMENT';
export const CHANGE_POST_COMMENT = 'CHANGE_POST_COMMENT';

export const setPostComments = data => ({
  type: SET_POST_COMMENTS,
  data,
});

export const getPostComments = postId => dispatch =>
  api
    .getPostComments(postId)
    .then(comments => dispatch(setPostComments({ postId, comments })));

export const changePostComment = comment => ({
  type: CHANGE_POST_COMMENT,
  comment,
});

export const getComment = commentId => dispatch =>
  api
    .getComment(commentId)
    .then(comment => dispatch(changePostComment(comment)));

export const pushPostComment = comment => ({
  type: PUSH_POST_COMMENT,
  comment,
});

export const addComment = inputData => dispatch =>
  api
    .addComment({ ...inputData, timestamp: Date.now() })
    .then(comment => dispatch(pushPostComment(comment)));

export const voteComment = data => dispatch =>
  api.voteComment(data).then(comment => dispatch(changePostComment(comment)));

export const deleteComment = commentId => dispatch =>
  api
    .deleteComment(commentId)
    .then(comment => dispatch(changePostComment(comment)));

export const editComment = data => dispatch =>
  api
    .editComment({ ...data, timestamp: Date.now() })
    .then(comment => dispatch(changePostComment(comment)));
