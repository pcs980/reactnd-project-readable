import React from 'react';
import {shallow} from 'enzyme';
import {ResourceNotFoundView} from '../../views/ResourceNotFoundView';

describe('Component ResourceNotFoundView', () => {
  const setup = {
    backButton: true,
    history: {}
  };
  it('should renders without crashing', () => {
    shallow(<ResourceNotFoundView {...setup}/>);
  });
});
