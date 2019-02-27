import React from 'react';
import {shallow} from 'enzyme';
import {CommentItem} from '../../components/CommentItem';

describe('Component CommentItem', () => {
  const setup = {
    comment: {
      author: 'pcs980',
      body: 'comment',
      voteScore: 1
    },
    editComment: jest.fn(),
    rateComment: jest.fn(),
    deleteComment: jest.fn()
  };
  it('should renders without crashing', () => {
    shallow(<CommentItem {...setup}/>);
  });
});
