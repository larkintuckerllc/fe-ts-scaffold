import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import { List } from 'immutable';
import React from 'react';
import PageView from './PageView';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({
  add: jest.fn(),
  adder: List<string>([]),
  counter: 0,
  decrement: jest.fn(),
  increment: jest.fn(),
  infinite: false,
  toggleInfinite: jest.fn(),
});

describe('PageView component', () => {
  it('shallow renders without crashing', () => {
    const {
      add,
      adder,
      counter,
      decrement,
      increment,
      infinite,
      toggleInfinite,
    } = getDefaultProps();
    shallow(
      <PageView
        add={add}
        adder={adder}
        counter={counter}
        decrement={decrement}
        increment={increment}
        infinite={infinite}
        toggleInfinite={toggleInfinite}
      />
    );
  });

  it('renders differently with infinite', () => {
    const { add, adder, counter, decrement, increment, toggleInfinite } = getDefaultProps();
    const wrapper = shallow(
      <PageView
        add={add}
        adder={adder}
        counter={counter}
        decrement={decrement}
        increment={increment}
        infinite={true}
        toggleInfinite={toggleInfinite}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
