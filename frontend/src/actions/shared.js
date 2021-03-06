import {showLoading, hideLoading} from 'react-redux-loading';
import {getInitialData} from '../utils/api';

import {storePosts} from './posts';
import {storeCategories} from './categories';
import {handleGetPostComments} from './comments';

export const SORT_POSTS = 'SORT_POSTS';
export const SEARCH_POSTS = 'SEARCH_POSTS';

export const searchPosts = (search) => (
  {
    type: SEARCH_POSTS,
    search
  }
);

export const sortPosts = (sortBy, fieldType) => (
  {
    type: SORT_POSTS,
    sortBy,
    fieldType
  }
);

export const handleInitialData = () => (dispatch) => {
  dispatch(showLoading());
  return getInitialData()
    .then((data) => {
      // Receive posts
      const posts = data[1].data;

      // Then get comments of each post
      posts.map((post) => {
        if (post.commentCount > 0) {
          dispatch(handleGetPostComments(post.id));
        }
        return post;
      });

      // Receive categories
      let categories = data[0].data.categories;

      // Store all categories and posts
      dispatch(storeCategories(categories));
      dispatch(storePosts(posts));

      // Set timestamp as default sort field
      dispatch(sortPosts('timestamp', 'numeric'));

      dispatch(hideLoading());
    });
};