import {categories} from '../../__mocks__/test.helper';
import reducer from '../../reducers/categories';
import {GET_ALL_CATEGORIES} from '../../actions/categories';

describe('Categories Reducer', () => {
  it('should initial categories state be empty', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should get all categories', () => {
    const action = {
      type: GET_ALL_CATEGORIES,
      categories
    };
    expect(typeof (reducer(undefined, action))).toBe('object');
  });
});