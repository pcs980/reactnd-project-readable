import {ADD_COMMENT,
  DELETE_COMMENT,
  GET_POST_COMMENTS,
  RATE_COMMENT} from '../actions/comments';

const comments = (state = {}, action) => {
  const comments = Object.values(state);
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...comments.concat(action.comment)
      }
    case GET_POST_COMMENTS:
      return {
        ...state,
        ...action.comments
      };
    case DELETE_COMMENT:
      return {
        ...comments.map((comment) => {
          if (comment.id === action.id) {
            comment.deleted = true
          }
          return comment;
        })
      }
    case RATE_COMMENT:
      return {
        ...comments.map((comment) => {
          if (comment.id === action.id) {
            comment.voteScore += action.option === 'upVote' ? 1 : -1
          }
          return comment;
        })
      }
    default:
      return state;
  }
};

export default comments;