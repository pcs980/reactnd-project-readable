import {ADD_POST,
  DELETE_POST,
  GET_ALL_POSTS,
  RATE_POST,
  UPDATE_POST,
  INCREMENT_COMMENT,
  DECREMENT_COMMENT} from '../actions/posts';

const posts = (state = {}, action) => {
  const posts = Object.values(state);
  switch (action.type) {
  case ADD_POST:
    return {
      ...posts.concat([action.post])
    };
  case DELETE_POST:
    return {
      ...posts.map((post) => {
        if (post.id === action.id) {
          post.deleted = true;
        }
        return post;
      })
    };
  case GET_ALL_POSTS:
    return {
      ...state,
      ...action.posts
    };
  case RATE_POST:
    return {
      ...posts.map((post) => {
        if (post.id === action.id) {
          post.voteScore += action.option === 'upVote' ? 1 : -1;
        }
        return post;
      })
    };
  case UPDATE_POST:
    return {
      ...posts
        .filter((post) => post.id !== action.post.id)
        .concat([action.post])
    };
  case INCREMENT_COMMENT:
    return {
      ...posts.map((post) => {
        if (post.id === action.id) {
          post.commentCount++;
        }
        return post;
      })
    };
  case DECREMENT_COMMENT:
    return {
      ...posts.map((post) => {
        if (post.id === action.id) {
          post.commentCount--;
        }
        return post;
      })
    };
  default:
    return state;
  }
};

export default posts;