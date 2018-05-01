import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Media from './Media';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

describe('Media component', () => {
  it('shallow renders without crashing', () => {
    shallow(<Media />);
  });
});
