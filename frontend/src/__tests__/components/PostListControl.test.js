import React from 'react';
import {shallow} from 'enzyme';
import {PostListControl} from '../../components/PostListControl';

describe('Component PostListControl', () => {
  const setup = {
    sortClick: jest.fn()
  };

  it('should renders without crashing', () => {
    shallow(<PostListControl sortClick={setup.sortClick}/>);
  });

  it('should renders sort menus', () => {
    const wrapper = shallow(<PostListControl {...setup}/>).dive();
    expect(wrapper.find('MenuItem')).toHaveLength(5);
  });
});
