export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

export const storeCategories = (categories) => (
  {
    type: GET_ALL_CATEGORIES,
    categories
  }
);
