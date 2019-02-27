import React from 'react';
import {shallow} from 'enzyme';
import TopBar from '../../components/TopBar';

describe('Component TopBar', () => {
  it('should renders without crashing', () => {
    shallow(<TopBar />);
  });
});