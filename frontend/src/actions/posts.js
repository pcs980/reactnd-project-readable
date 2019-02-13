import {showLoading, hideLoading} from 'react-redux-loading';
import {postPost, getPosts} from '../utils/api';

export const ADD_POST = 'SAVE_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_POST = 'GET_POST';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const VOTE_POST = 'VOTE_POST';

const savePost = (post) => {
  return {
    type: ADD_POST,
    post
  };
};

export const handleSavePost = (info) => (dispatch) => {
  return postPost(info)
    .then((post) => {
      console.log('saved post', post);
      dispatch(savePost(post));
    })
    .catch((error) => {
      console.warn('Error while saving post', error);
    });
};

export const getAllPosts = (posts) => (
  {
    type: GET_ALL_POSTS,
    posts
  }
);

export const handleGetPosts = () => (dispatch) => {
  dispatch(showLoading());

  return getPosts()
    .then((posts) => {
      console.log('all posts', posts);
      dispatch(this.getAllPosts(posts));
      dispatch(hideLoading());
    })
    .catch((error) => {
      console.warn('Error while getting all posts', error);
    });
};