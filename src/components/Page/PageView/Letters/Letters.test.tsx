import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Letters from './Letters';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

describe('Letters component', () => {
  it('shallow renders without crashing', () => {
    shallow(<Letters />);
  });
});
