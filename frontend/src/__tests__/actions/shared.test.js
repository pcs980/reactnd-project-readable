import * as actions from '../../actions/shared';

import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
const store = mockStore({posts: {}});

describe('Shared Action Creators', () => {
  it('should create search posts action', () => {
    const action = actions.searchPosts('title');
    expect(action).toHaveProperty('type', actions.SEARCH_POSTS);
    expect(action).toHaveProperty('search', 'title');
    expect.assertions(2);
  });

  it('should create sort posts action', () => {
    const action = actions.sortPosts('timestamp', 'numeric');
    expect(action).toHaveProperty('type', actions.SORT_POSTS);
    expect(action).toHaveProperty('sortBy', 'timestamp');
    expect(action).toHaveProperty('fieldType', 'numeric');
    expect.assertions(3);
  });

  it('should handle initial data', async () => {
    mockAxios.all.mockImplementationOnce(() =>
      Promise.resolve([
        {
          data: []
        },
        {
          data: []
        }
      ])
    );
    await store.dispatch(actions.handleInitialData());
    expect(mockAxios.all).toHaveBeenCalled();
    expect(mockAxios.all).toHaveBeenCalledTimes(1);
    expect.assertions(2);
  });
});