import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Counter from './Counter';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({
  counter: 0,
  decrement: jest.fn(),
  increment: jest.fn(),
});

describe('Counter component', () => {

  it('shallow renders without crashing', () => {
    const { counter, decrement, increment } = getDefaultProps();
    shallow((
      <Counter
        counter={counter}
        decrement={decrement}
        increment={increment}
      />
    ));
  });

  it('calls decrement on root_decrement click', () => {
    const { counter, decrement, increment } = getDefaultProps();
    const wrapper = shallow((
      <Counter
        counter={counter}
        decrement={decrement}
        increment={increment}
      />
    ));
    wrapper.find('#test_decrement').simulate('click');
    const callsLength = 1;
    expect(decrement.mock.calls).toHaveLength(callsLength);
  });

  it('calls increment on root_increment click', () => {
    const { counter, decrement, increment } = getDefaultProps();
    const wrapper = shallow((
      <Counter
        counter={counter}
        decrement={decrement}
        increment={increment}
      />
    ));
    wrapper.find('#test_increment').simulate('click');
    const callsLength = 1;
    expect(increment.mock.calls).toHaveLength(callsLength);
  });

});
