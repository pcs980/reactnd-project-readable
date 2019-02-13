import {GET_ALL_CATEGORIES, CHANGE_CATEGORY} from '../actions/categories';

const categories = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        ...action.categories
      }
    case CHANGE_CATEGORY:
      console.log('changing category?', Object.values(state));
      return {
        ...Object.values(state).map((category) => ({
          ...category,
          active: (action.activeMenu === category.name)
        }))
      }
    default:
      return state;
  }
};

export default categories;