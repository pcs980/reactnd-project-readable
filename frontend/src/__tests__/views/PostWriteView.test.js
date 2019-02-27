import React from 'react';
import {shallow} from 'enzyme';
import {PostWriteView} from '../../views/PostWriteView';

describe('Component PostWriteView', () => {
  const setup = {
    action: 'Edit post',
    history: {},
    categories: [{name: 'react'}],
    post: {
      id: 'post-id',
      title: 'post',
      body: 'post content',
      author: 'pcs980',
      category: 'react',
      commentCount: 0,
      timestamp: 123012031429,
      voteScore: 1
    },
    onSavePost: jest.fn(),
    doStorePost: jest.fn(),
  };
  it('should renders without crashing', () => {
    shallow(<PostWriteView {...setup}/>);
  });
});
