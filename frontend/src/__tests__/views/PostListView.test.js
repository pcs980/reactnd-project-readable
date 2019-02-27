import React from 'react';
import {shallow} from 'enzyme';
import {PostListView} from '../../views/PostListView';

import {posts} from '../../__mocks__/test.helper';

describe('Component PostListView', () => {
  const setup = {
    onRatePost: jest.fn(),
    posts: Object.values(posts),
    selectedCategory: 'react',
    doSearchPosts: jest.fn(),
    doStoreRatePost: jest.fn(),
    doStoreSearchPosts: jest.fn(),
    doStoreSortPosts: jest.fn()
  };
  it('should renders without crashing', () => {
    shallow(<PostListView {...setup}/>);
  });
});
