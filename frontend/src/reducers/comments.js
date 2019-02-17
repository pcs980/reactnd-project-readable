import {ADD_COMMENT, GET_POST_COMMENTS} from '../actions/comments';

const comments = (state ={}, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        ...action.comment
      }
    case GET_POST_COMMENTS:
      return {
        ...state,
        ...action.comments
      };
    default:
      return state;
  }
};

export default comments;