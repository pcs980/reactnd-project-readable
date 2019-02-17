import {savePost, getPosts} from '../utils/api';

export const ADD_POST = 'SAVE_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_POST = 'GET_POST';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const VOTE_POST = 'VOTE_POST';

const storePost = (post) => {
  return {
    type: ADD_POST,
    post
  };
};

export const handleSavePost = (info) => (dispatch) => {
  return savePost(info)
    .then((post) => {
      console.log('saved post', post);
      dispatch(storePost(post));
    })
    .catch((error) => {
      console.warn('Error while saving post', error);
    });
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
