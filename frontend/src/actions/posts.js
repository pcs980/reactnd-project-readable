import {
  deletePost,
  getPosts,
  putPost,
  savePost,
  updateRatePost} from '../utils/api';

export const ADD_POST = 'SAVE_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const RATE_POST = 'RATE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export const INCREMENT_COMMENT = 'INCREMENT_COMMENT';
export const DECREMENT_COMMENT = 'DECREMENT_COMMENT';

const storePost = (post) => (
  {
    type: ADD_POST,
    post
  }
);

const updatePost = (post) => (
  {
    type: UPDATE_POST,
    post
  }
);

export const handleSavePost = (post) => (dispatch) => {
  if (post.id) {
    return putPost(post)
      .then(({data}) => {
        console.log('updated post', data);
        dispatch(updatePost(data));
      })
      .catch((error) => {
        console.warn('Error while updating post', error);
      });
  } else {
    return savePost(post)
      .then(({data}) => {
        console.log('saved post', data);
        dispatch(storePost(data));
      })
      .catch((error) => {
        console.warn('Error while saving post', error);
      });
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
      console.warn('Error while getting all posts', error);
    });
};

const ratePost = (id, option) => (
  {
    type: RATE_POST,
    id,
    option
  }
);

export const handleRatePost = (id, option) => (dispatch) => {
  return updateRatePost(id, option)
    .then(() => {
      dispatch(ratePost(id, option));
    })
    .catch((error) => {
      console.warn('Error while rating comment', error);
    });
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

const removePost = (id) => (
  {
    type: DELETE_POST,
    id
  }
);

export const handleDeletePost = (id) => (dispatch) => {
  return deletePost(id)
    .then(() => {
      dispatch(removePost(id));
    })
    .catch((error) => {
      console.warn('Error while deleting comment', error);
    });
};