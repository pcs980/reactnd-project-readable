import {
  deleteComment,
  getPostComments,
  putComment,
  saveComment,
  updateRateComment} from '../utils/api';

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const RATE_COMMENT = 'RATE_COMMENT';
export const STORE_COMMENT = 'STORE_COMMENT';

export const storeComment = (comment) => (
  {
    type: STORE_COMMENT,
    comment
  }
);

export const handleSaveComment = (comment) => () => {
  // It's a comment edition if there's an id
  if (comment.id) {
    return putComment(comment);
  } else {
    return saveComment(comment);
  }
};

const storePostComments = (id, comments) => (
  {
    type: GET_POST_COMMENTS,
    id,
    comments
  }
);

export const handleGetPostComments = (id) => (dispatch) => {
  return getPostComments(id)
    .then(({data}) => {
      dispatch(storePostComments(id, data));
    })
    .catch((error) => {
      console.error('Error while getting comments', error);
    });
};

export const rateComment = (id, option) => (
  {
    type: RATE_COMMENT,
    id,
    option
  }
);

export const handleRateComment = (id, option) => () => {
  return updateRateComment(id, option);
};

export const removeComment = (id) => (
  {
    type: DELETE_COMMENT,
    id
  }
);

export const handleDeleteComment = (id) => () => {
  return deleteComment(id);
};