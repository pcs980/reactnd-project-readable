import reducer from '../../reducers/shared';
import {shared} from '../../__mocks__/test.helper';
import {
  SEARCH_POSTS,
  SORT_POSTS} from '../../actions/shared';

describe('Shared Reducer', () => {
  it('should initial shared state be empty', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should set search state', () => {
    const action = {
      type: SEARCH_POSTS,
      search: 'title'
    };
    expect(reducer(shared, action)).toHaveProperty('searchPostByTitle', 'title');
  });

  it('should set sort by timestamp ascending', () => {
    const action = {
      type: SORT_POSTS,
      fieldType: 'numeric',
      sortBy: 'timestamp'
    };
    const result = reducer(shared, action);
    expect(result).toHaveProperty('sortBy', 'timestamp');
    expect(result).toHaveProperty('fieldType', 'numeric');
    expect(result).toHaveProperty('order', 'ascending');
    expect.assertions(3);
  });

  it('should set sort by vote score descending because it is already by vote score', () => {
    const action = {
      type: SORT_POSTS,
      fieldType: 'numeric',
      sortBy: 'voteScore'
    };
    const result = reducer(shared, action);
    expect(result).toHaveProperty('sortBy', 'voteScore');
    expect(result).toHaveProperty('fieldType', 'numeric');
    expect(result).toHaveProperty('order', 'descending');
    expect.assertions(3);
  });

});