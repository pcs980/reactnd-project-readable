import React from 'react';
import {shallow} from 'enzyme';
import {CommentList} from '../../components/CommentList';

describe('Component CommentList', () => {
  const setup = {
    id: 'post-id',
    deleteComment: jest.fn(),
    rateComment: jest.fn(),
    saveComment: jest.fn(),
    updateComment: jest.fn(),
    comments: []
  };
  it('should renders without crashing', () => {
    shallow(<CommentList {...setup}/>);
  });
});
