import {showLoading, hideLoading} from 'react-redux-loading';
import {getInitialData} from '../utils/api';

import {storePosts} from './posts';
import {storeCategories} from './categories';

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

      // Add category all to show all posts
      let categories = [{
        name: 'all',
        path: ''
      }];

      // Then add each category received
      categories = categories.concat(data[0].data.categories);

      // Store all categories and posts
      dispatch(storeCategories(categories));
      dispatch(storePosts(posts));

      // Set timestamp as default sort field
      dispatch(sortPosts('timestamp'));

      // Assume the first category (all) as active
      dispatch(changeCategory(categories[0].name));

      dispatch(hideLoading());
    });
};