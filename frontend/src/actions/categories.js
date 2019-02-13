export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

export const getAllCategories = (categories) => (
  {
    type: GET_ALL_CATEGORIES,
    categories
  }
);
