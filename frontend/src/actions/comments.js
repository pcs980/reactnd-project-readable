import {saveComment, getPostComments} from '../utils/api';

export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';

const storeComment = (comment) => (
  {
    type: ADD_COMMENT,
    comment
  }
);

export const handleSaveComment = (info) => (dispatch) => {
  return saveComment(info)
    .then(({data}) => {
      console.log('Saved comment', data);
      dispatch(storeComment(data));
    })
    .catch((error) => {
      console.warn('Error while saving comment', error);
    });
};

const storePostComments = (id, comments) => (
  {
    type: GET_POST_COMMENTS,
    id,
    comments
  }
);

export const handleGetPostComments = (id) => (dispatch) => {
  console.log({id});
  return getPostComments(id)
    .then(({data}) => {
      dispatch(storePostComments(id, data));
    })
    .catch((error) => {
      console.warn('Error while getting comments', error);
    });
};