import React from 'react';
import {mount} from 'enzyme';

import Thermometer from '../Thermometer';

describe('[Component] Thermometer', () => {
  xit('should return thermometer', () => {
    const wrapper = mount(<Thermometer score={8}/>);
    expect(wrapper.find('name')).toEqual('thermometer half');
  });
});