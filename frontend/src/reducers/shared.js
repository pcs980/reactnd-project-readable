import {SEARCH_POSTS, SORT_POSTS} from '../actions/shared';

const shared = (state = {}, action) => {
  switch (action.type) {
  case SEARCH_POSTS:
    return {
      ...state,
      searchPostByTitle: action.search
    };
  case SORT_POSTS:
    /*
      Order logic (ascending or descending)
      - Keep order when the field has changed
      - Set to ascending if order is undefined
      - Change order only if the field is same

      Field Type
      - Numeric or Alphabet
    */
    return {
      ...state,
      fieldType: action.fieldType,
      sortBy: action.sortBy,
      order: (action.sortBy !== state.sortBy
        ? state.order
          ? state.order
          : 'ascending'
        : state.order === 'ascending'
          ? 'descending'
          : 'ascending')
    };
  default:
    return state;
  }
};

export default shared;