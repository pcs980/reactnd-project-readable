import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading';

import posts from './posts';
import categories from './categories';
import shared from './shared';

export default combineReducers({
  categories,
  posts,
  shared,
  loadingBar: loadingBarReducer
});