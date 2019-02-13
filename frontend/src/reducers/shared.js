import {CHANGE_CATEGORY, SORT_POSTS} from '../actions/shared';

const shared = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        activeMenu: action.activeMenu
      }
    case SORT_POSTS:
      /*
      Order logic (ascending or descending)
      - Keep order when the field has changed
      - Set to ascending if order is undefined
      - Change order only if the field is same
      */
      const order = (action.sortBy !== state.sortBy
        ? state.order
          ? state.order
          : 'ascending'
        : state.order === 'ascending'
          ? 'descending'
          : 'ascending');

      return {
        ...state,
        sortBy: action.sortBy,
        order
      }
    default:
      return state;
  }
};

export default shared;