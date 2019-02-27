import React from 'react';
import {shallow} from 'enzyme';
import {PostItem} from '../../components/PostItem';

describe('Component PostItem', () => {
  const setup = {
    post: {
      voteScore: 1
    },
    ratePost: jest.fn()
  };
  it('should renders without crashing', () => {
    shallow(<PostItem {...setup}/>);
  });
});
