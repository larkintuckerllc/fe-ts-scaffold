import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Listing from './Listing';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({
  add: jest.fn(),
  items: ['Hello World'],
});

describe('Listing component', () => {
  it('shallow renders without crashing', () => {
    const defaultProps = getDefaultProps();
    shallow(<Listing {...defaultProps} />);
  });

  it('calls add on click', () => {
    const { add, ...defaultProps } = getDefaultProps();
    const wrapper = shallow(<Listing {...defaultProps} add={add} />);
    const callsLength = 1;
    const call0Result = 'Hello World';
    wrapper.find('#test_add').simulate('click');
    expect(add.mock.calls).toHaveLength(callsLength);
    expect(add.mock.calls[0][0]).toBe(call0Result);
  });
});
