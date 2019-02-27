import React from 'react';
import {shallow} from 'enzyme';
import Thermometer from '../../components/Thermometer';

describe('Component Thermometer', () => {
  const setup = {
    score: 2
  };
  it('should renders without crashing', () => {
    shallow(<Thermometer {...setup}/>);
  });
});