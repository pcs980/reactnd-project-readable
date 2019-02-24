import {
  deletePost,
  getPosts,
  putPost,
  savePost,
  updateRatePost} from '../utils/api';

export const STORE_POST = 'STORE_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const RATE_POST = 'RATE_POST';

export const INCREMENT_COMMENT = 'INCREMENT_COMMENT';
export const DECREMENT_COMMENT = 'DECREMENT_COMMENT';

export const storePost = (post) => (
  {
    type: STORE_POST,
    post
  }
);

export const handleSavePost = (post) => () => {
  if (post.id) {
    return putPost(post);
  } else {
    return savePost(post);
  }
};

export const storePosts = (posts) => (
  {
    type: GET_ALL_POSTS,
    posts
  }
);

export const handleGetPosts = () => (dispatch) => {
  return getPosts()
    .then((posts) => {
      dispatch(this.storePosts(posts));
    })
    .catch((error) => {
      console.error('Error while getting all posts', error);
    });
};

export const ratePost = (id, option) => (
  {
    type: RATE_POST,
    id,
    option
  }
);

export const handleRatePost = (id, option) => () => {
  return updateRatePost(id, option);
};

export const incrementComment = (id) => (
  {
    type: INCREMENT_COMMENT,
    id
  }
);

export const decrementComment = (id) => (
  {
    type: DECREMENT_COMMENT,
    id
  }
);

export const removePost = (id) => (
  {
    type: DELETE_POST,
    id
  }
);

export const handleDeletePost = (id) => () => {
  return deletePost(id);
};