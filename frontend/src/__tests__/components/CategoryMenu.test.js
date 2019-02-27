import React from 'react';
import {shallow} from 'enzyme';
import {CategoryMenu} from '../../components/CategoryMenu';

import {posts} from '../../__mocks__/test.helper';

describe('Component CategoryMenu', () => {
  const setup = {
    posts,
    categories: [{name: 'react', path: 'react', count: 1}],
    searchPosts: jest.fn()
  };
  it('should renders without crashing', () => {
    shallow(<CategoryMenu {...setup}/>);
  });
});
