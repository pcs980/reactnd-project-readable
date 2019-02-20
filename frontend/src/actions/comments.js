import {
  deleteComment,
  getPostComments,
  putComment,
  saveComment,
  updateRateComment} from '../utils/api';

export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const RATE_COMMENT = 'RATE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

const storeComment = (comment) => (
  {
    type: ADD_COMMENT,
    comment
  }
);

const updateComment = (comment) => (
  {
    type: UPDATE_COMMENT,
    comment
  }
);

export const handleSaveComment = (comment) => (dispatch) => {
  if (comment.id) {
    return putComment(comment)
      .then(({data}) => {
        dispatch(updateComment(data));
      })
      .catch((error) => {
        console.warn('Error while saving comment', error);
      });
  } else {
    return saveComment(comment)
      .then(({data}) => {
        dispatch(storeComment(data));
      })
      .catch((error) => {
        console.warn('Error while saving comment', error);
      });
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
      console.warn('Error while getting comments', error);
    });
};

const rateComment = (id, option) => (
  {
    type: RATE_COMMENT,
    id,
    option
  }
);

export const handleRateComment = (id, option) => (dispatch) => {
  return updateRateComment(id, option)
    .then(() => {
      dispatch(rateComment(id, option));
    })
    .catch((error) => {
      console.warn('Error while rating comment', error);
    });
};

const removeComment = (id) => (
  {
    type: DELETE_COMMENT,
    id
  }
);

export const handleDeleteComment = (id) => (dispatch) => {
  return deleteComment(id)
    .then((data) => {
      console.log('COMMENT DELETED', data);
      dispatch(removeComment(id));
    })
    .catch((error) => {
      console.warn('Error while deleting comment', error);
    });
};