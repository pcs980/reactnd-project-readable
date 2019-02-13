import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading';

import posts from './posts';
import categories from './categories';

export default combineReducers({
  categories,
  posts,
  loadingBar: loadingBarReducer
});