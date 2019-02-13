import {showLoading, hideLoading} from 'react-redux-loading';
import {getInitialData} from '../utils/api';

import {getAllPosts} from './posts';
import {getAllCategories} from './categories';

export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const SORT_POSTS = 'SORT_POSTS';

export const changeCategory = (activeMenu) => (
  {
    type: CHANGE_CATEGORY,
    activeMenu
  }
);

export const sortPosts = (sortBy) => (
  {
    type: SORT_POSTS,
    sortBy
  }
);

export const handleInitialData = () => (dispatch) => {
  dispatch(showLoading());
  return getInitialData()
    .then((data) => {
      const posts = data[1].data;
      const categories = data[0].data.categories;

      // Get all categories and posts
      dispatch(getAllCategories(categories));
      dispatch(getAllPosts(posts));

      // Sort posts by timestamp as default
      dispatch(sortPosts('timestamp'));

      // Assume the first category as active
      if (categories.length > 0) {
        dispatch(changeCategory(categories[0].name));
      }

      dispatch(hideLoading());
    });
};