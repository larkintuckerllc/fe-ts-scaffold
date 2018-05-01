import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import AnotherCounterView from './AnotherCounterView';
import styles from './styles.less';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({
  counter: 0,
  decrement: jest.fn(),
  increment: jest.fn(),
});

describe('Counter component', () => {
  it('shallow renders without crashing', () => {
    const defaultProps = getDefaultProps();
    shallow(<AnotherCounterView {...defaultProps} />);
  });

  it('calls decrement on test_decrement click', () => {
    const { decrement, ...defaultProps } = getDefaultProps();
    const wrapper = shallow(<AnotherCounterView {...defaultProps} decrement={decrement} />);
    const callsLength = 1;
    const testDecrement = wrapper.find(`#${styles.decrement}`);
    testDecrement.simulate('click');
    expect(decrement.mock.calls).toHaveLength(callsLength);
  });

  it('calls increment on test_increment click', () => {
    const { increment, ...defaultProps } = getDefaultProps();
    const wrapper = shallow(<AnotherCounterView {...defaultProps} increment={increment} />);
    const callsLength = 1;
    const testIncrement = wrapper.find(`#${styles.increment}`);
    testIncrement.simulate('click');
    expect(increment.mock.calls).toHaveLength(callsLength);
  });
});
