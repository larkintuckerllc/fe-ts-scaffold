import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Styling from './Styling';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

describe('Styling component', () => {
  it('shallow renders without crashing', () => {
    shallow(<Styling />);
  });
});
