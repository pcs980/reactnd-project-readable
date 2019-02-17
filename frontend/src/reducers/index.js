import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading';

import posts from './posts';
import categories from './categories';
import comments from './comments';
import shared from './shared';

export default combineReducers({
  categories,
  posts,
  comments,
  shared,
  loadingBar: loadingBarReducer
});