import {ADD_POST, GET_ALL_POSTS} from '../actions/posts';

const posts = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        ...state.posts.concat(action.post)
      }
    case GET_ALL_POSTS:
      return {
        ...state,
        ...action.posts
      }
    default:
      return state;
  }
};

export default posts;