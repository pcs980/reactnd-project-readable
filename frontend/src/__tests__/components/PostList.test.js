import React from 'react';
import {shallow} from 'enzyme';
import {PostList} from '../../components/PostList';

import {posts} from '../../__mocks__/test.helper';

describe('Component PostList', () => {
  const setup = {
    shared: {},
    posts: Object.values(posts),
    category: 'react',
    loading: false,
    ratePost: jest.fn(),
    clearSearch: jest.fn()
  };
  it('should renders without crashing', () => {
    shallow(<PostList {...setup}/>);
  });
});
