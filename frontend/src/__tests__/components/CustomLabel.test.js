import React from 'react';
import {shallow} from 'enzyme';
import CustomLabel from '../../components/CustomLabel';

describe('Component CustomLabel', () => {
  it('should renders without crashing', () => {
    shallow(<CustomLabel />);
  });
});