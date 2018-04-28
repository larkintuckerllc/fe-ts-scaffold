import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Items from './Items';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

describe('Items component', () => {
  it('shallow renders without crashing', () => {
    const itemDefault = {
      id: 0,
      name: 'name',
    };
    shallow(<Items items={[itemDefault]} />);
  });
});
