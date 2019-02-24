import {
  DELETE_COMMENT,
  GET_POST_COMMENTS,
  RATE_COMMENT,
  STORE_COMMENT} from '../actions/comments';

const comments = (state = {}, action) => {
  const comments = Object.values(state);
  switch (action.type) {
  case DELETE_COMMENT:
    return {
      ...comments.map((comment) => {
        if (comment.id === action.id) {
          comment.deleted = true;
        }
        return comment;
      })
    };
  case GET_POST_COMMENTS:
    return {
      ...state,
      ...action.comments
    };
  case RATE_COMMENT:
    return {
      ...comments.map((comment) => {
        if (comment.id === action.id) {
          comment.voteScore += action.option === 'upVote' ? 1 : -1;
        }
        return comment;
      })
    };
  case STORE_COMMENT:
    return {
      ...comments
        .filter((comment) => comment.id !== action.comment.id)
        .concat([action.comment])
    };
  default:
    return state;
  }
};

export default comments;