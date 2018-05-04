import itemsTestData from 'APIS/items/items.testdata.json';
import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Items from './Items';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

describe('Items component', () => {
  it('shallow renders without crashing', () => {
    shallow(<Items items={itemsTestData} />);
  });
});
