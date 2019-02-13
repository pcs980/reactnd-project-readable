export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

export const getAllCategories = (categories) => (
  {
    type: GET_ALL_CATEGORIES,
    categories
  }
);

export const changeCategory = (activeMenu) => (
  {
    type: CHANGE_CATEGORY,
    activeMenu
  }
);