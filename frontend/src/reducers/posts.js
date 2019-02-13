import {GET_ALL_POSTS} from '../actions/posts';

const posts = (state = {}, action) => {
  switch (action.type) {
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