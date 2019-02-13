import {showLoading, hideLoading} from 'react-redux-loading';
import {getInitialData} from '../utils/api';

import {getAllPosts} from './posts';
import {getAllCategories} from './categories';

export const handleInitialData = () => (dispatch) => {
  dispatch(showLoading());
  return getInitialData()
    .then((data) => {
      // Including active property to each category
      // and assuming the first one is active
      const categories = data[0].data.categories;
      categories.forEach((category, i) => (
        category.active = i === 0 ? true : false
      ));

      dispatch(getAllCategories(categories));
      dispatch(getAllPosts({...data[1].data}));
      dispatch(hideLoading());
    });
};