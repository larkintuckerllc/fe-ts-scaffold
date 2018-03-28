import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import React from 'react';
import Styling from './Styling';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
it('shallow renders without crashing', () => {
  shallow(<Styling />);
});
