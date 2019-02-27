import React from 'react';
import {shallow} from 'enzyme';
import {App} from '../../components/App';

describe('Component App', () => {
  const setup = {
    loading: false,
    getInitialData: jest.fn()
  };
  it('should renders without crashing', () => {
    shallow(<App {...setup}/>);
  });
});
