import * as actions from '../../actions/categories';

describe('Categories Action Creators', () => {
  it('should create get all categories action', () => {
    expect(actions.storeCategories({})).toHaveProperty('type', actions.GET_ALL_CATEGORIES);
  });
});