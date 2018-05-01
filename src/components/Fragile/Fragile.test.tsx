import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Fragile from './Fragile';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

describe('Ant component', () => {
  it('shallow renders without crashing', () => {
    shallow(<Fragile />);
  });
});
