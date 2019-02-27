import React from 'react';
import {shallow} from 'enzyme';
import {PostDetailView} from '../../views/PostDetailView';

import {posts, comments} from '../../__mocks__/test.helper';

describe('Component PostDetailView', () => {
  const setup = {
    comments: Object.values(comments),
    history: {},
    loading: false,
    post: Object.values(posts),
    onDeleteComment: jest.fn(),
    onDeletePost: jest.fn(),
    onRateComment: jest.fn(),
    onRatePost: jest.fn(),
    onSaveComment: jest.fn(),
    doStoreComment: jest.fn(),
    doStoreDecrementComment: jest.fn(),
    doStoreIncrementComment: jest.fn(),
    doStoreRateComment: jest.fn(),
    doStoreRatePost: jest.fn(),
    doStoreRemoveComment: jest.fn(),
    doStoreRemovePost: jest.fn(),
  };
  it('should renders without crashing', () => {
    shallow(<PostDetailView {...setup}/>);
  });
});
