import Adapter from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import React from 'react';
import Counter from './Counter';

Enzyme.configure({ adapter: new Adapter() });
const setup = (propOverrides: any) => {
  const props = {
    counter: 0,
    decrement: jest.fn(),
    increment: jest.fn(),
    ...propOverrides,
  };
  return ({
      props,
      wrapper: shallow(<Counter {...props} />),
  });
}; 
describe('Counter component', () => {
  it('shallow renders without crashing', () => {
    setup({});
  });
  it('calls decrement on rootDecrement click', () => {
    const { props: { decrement }, wrapper } = setup({});
    wrapper.find('#rootDecrement').simulate('click');
    expect(decrement.mock.calls).toHaveLength(1);
  });
  it('calls increment on rootIncrement click', () => {
    const { props: { increment }, wrapper } = setup({});
    wrapper.find('#rootIncrement').simulate('click');
    expect(increment.mock.calls).toHaveLength(1);
  });
});