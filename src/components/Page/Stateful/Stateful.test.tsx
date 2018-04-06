import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import React from 'react';
import Stateful from './Stateful';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const getDefaultProps = () => ({
});
describe('Stateful component', () => {
  it('shallow renders without crashing', () => {
    const {} = getDefaultProps();
    shallow((
      <Stateful
      />
    ));
  });
  it('handles test_increment click', () => {
    const {} = getDefaultProps();
    const wrapper = shallow((
      <Stateful
      />
    ));
    wrapper.find('#test_increment').simulate('click');
  });
  it('handles test_decrement click', () => {
    const {} = getDefaultProps();
    const wrapper = shallow((
      <Stateful
      />
    ));
    wrapper.find('#test_decrement').simulate('click');
  });
});
