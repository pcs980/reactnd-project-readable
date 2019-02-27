import React from 'react';
import {shallow} from 'enzyme';
import {CommentForm} from '../../components/CommentForm';

describe('Component CommentForm', () => {
  const setup = {
    cancelEdition: jest.fn(),
    saveComment: jest.fn(),
    updateComment: jest.fn(),
    history: {}
  };
  it('should renders without crashing', () => {
    shallow(<CommentForm {...setup}/>);
  });
});
