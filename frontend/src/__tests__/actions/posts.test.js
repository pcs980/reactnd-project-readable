import {posts} from '../../__mocks__/test.helper';
import * as actions from '../../actions/posts';

import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
const store = mockStore({posts: {}});

jest.mock('../../reducers');

describe('Post Action Creators', () => {

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it('should create get all posts action', () => {
    expect(actions.storePosts(posts)).toHaveProperty('type', actions.GET_ALL_POSTS);
  });

  it('should create store post action', () => {
    expect(actions.storePost({})).toHaveProperty('type', actions.STORE_POST);
  });

  it('should create delete post action', () => {
    const action = actions.removePost('delete-id');
    expect(action).toHaveProperty('type', actions.DELETE_POST);
    expect(action).toHaveProperty('id', 'delete-id');
    expect.assertions(2);
  });

  it('should create rate post action', () => {
    const action = actions.ratePost('rate-id', 'upVote');
    expect(action).toHaveProperty('type', actions.RATE_POST);
    expect(action).toHaveProperty('id', 'rate-id');
    expect(action).toHaveProperty('option', 'upVote');
    expect.assertions(3);
  });

  it('should create increment comment action', () => {
    const action = actions.incrementComment('increment-id');
    expect(action).toHaveProperty('type', actions.INCREMENT_COMMENT);
    expect(action).toHaveProperty('id', 'increment-id');
    expect.assertions(2);
  });

  it('should create decrement comment action', () => {
    const action = actions.decrementComment('decrement-id');
    expect(action).toHaveProperty('type', actions.DECREMENT_COMMENT);
    expect(action).toHaveProperty('id', 'decrement-id');
    expect.assertions(2);
  });

  it('should get posts from api', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve(posts)
    );
    const expectedActions = [{type: actions.GET_ALL_POSTS, posts}];
    await store.dispatch(actions.handleGetPosts());
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect.assertions(3);
  });

  it('should save post from api', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({})
    );
    await store.dispatch(actions.handleSavePost({}));
    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect.assertions(2);
  });

  it('should update post from api', async () => {
    mockAxios.put.mockImplementationOnce(() =>
      Promise.resolve({})
    );
    await store.dispatch(actions.handleSavePost({id: 'a1b2'}));
    expect(mockAxios.put).toHaveBeenCalled();
    expect(mockAxios.put).toHaveBeenCalledTimes(1);
    expect.assertions(2);
  });

  it('should rate post from api', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({})
    );
    await store.dispatch(actions.handleRatePost());
    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect.assertions(2);
  });

  it('should delete post from api', async () => {
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.resolve({})
    );
    await store.dispatch(actions.handleDeletePost());
    expect(mockAxios.delete).toHaveBeenCalled();
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    expect.assertions(2);
  });

});