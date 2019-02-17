import {showLoading, hideLoading} from 'react-redux-loading';
import {getInitialData} from '../utils/api';

import {storePosts} from './posts';
import {storeCategories} from './categories';
import {handleGetPostComments} from './comments';

export const SORT_POSTS = 'SORT_POSTS';

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

      // Add property count with the count of posts
      categories = categories.map((category) => {
        return {
          ...category,
          count: posts.reduce((count, post) => {
            return count + (post.category === category.name ? 1 : 0);
          }, 0)
        }
      });

      // Finally add category all to show all posts
      categories = [
        {
          name: 'all',
          path: '',
          count: posts.length
        }, ...categories];

      // Store all categories and posts
      dispatch(storeCategories(categories));
      dispatch(storePosts(posts));

      // Set timestamp as default sort field
      dispatch(sortPosts('timestamp'));

      dispatch(hideLoading());
    });
};