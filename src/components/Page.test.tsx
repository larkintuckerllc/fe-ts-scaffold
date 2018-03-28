import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
import { List } from 'immutable';
/* tslint:disable-next-line */
import React from 'react';
import { Page } from './Page';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const setup = (propOverrides: any) => {
  const props = {
    add: jest.fn(),
    adder: List<string>([]),
    counter: 0,
    decrement: jest.fn(),
    increment: jest.fn(),
    ...propOverrides,
  };
  return ({
    props,
    wrapper: shallow(<Page {...props} />),
  });
};
it('shallow renders without crashing', () => {
  setup({});
});
