import * as actions from '../../actions/comments';

import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
const store = mockStore({comments: {}});

describe('Comments Action Creators', () => {

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it('should create store comment action', () => {
    expect(actions.storeComment({})).toHaveProperty('type', actions.STORE_COMMENT);
  });

  it('should create delete comment action', () => {
    const action = actions.removeComment('delete-id');
    expect(action).toHaveProperty('type', actions.DELETE_COMMENT);
    expect(action).toHaveProperty('id', 'delete-id');
    expect.assertions(2);
  });

  it('should create rate comment action', () => {
    const action = actions.rateComment('rate-id', 'downVote');
    expect(action).toHaveProperty('type', actions.RATE_COMMENT);
    expect(action).toHaveProperty('id', 'rate-id');
    expect(action).toHaveProperty('option', 'downVote');
    expect.assertions(3);
  });

  it('should get comments from api', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({})
    );
    const expectedActions = [{type: actions.GET_POST_COMMENTS}];
    await store.dispatch(actions.handleGetPostComments());
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect.assertions(3);
  });

  it('should save comment from api', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({})
    );
    await store.dispatch(actions.handleSaveComment({}));
    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect.assertions(2);
  });

  it('should update comment from api', async () => {
    mockAxios.put.mockImplementationOnce(() =>
      Promise.resolve({})
    );
    await store.dispatch(actions.handleSaveComment({id: 'a1b2'}));
    expect(mockAxios.put).toHaveBeenCalled();
    expect(mockAxios.put).toHaveBeenCalledTimes(1);
    expect.assertions(2);
  });

  it('should rate comments from api', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({})
    );
    await store.dispatch(actions.handleRateComment());
    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect.assertions(2);
  });

  it('should delete comment from api', async () => {
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.resolve({})
    );
    await store.dispatch(actions.handleDeleteComment());
    expect(mockAxios.delete).toHaveBeenCalled();
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    expect.assertions(2);
  });
});