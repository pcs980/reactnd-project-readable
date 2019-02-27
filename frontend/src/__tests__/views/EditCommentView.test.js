import React from 'react';
import {shallow} from 'enzyme';
import {EditCommentView} from '../../views/EditCommentView';

describe('Component EditCommentView', () => {
  const setup = {
    comment: {}
  };
  it('should renders without crashing', () => {
    shallow(<EditCommentView {...setup}/>);
  });
});
