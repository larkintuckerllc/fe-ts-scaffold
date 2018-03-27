import Adapter from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import React from 'react';
import Listing from './Listing';

Enzyme.configure({ adapter: new Adapter() });
const setup = (propOverrides: any) => {
  const props = {
    add: jest.fn(),
    items: ['Hello There'],
    ...propOverrides,
  };
  return ({
    props,
    wrapper: shallow(<Listing {...props} />),
  });
}; 
describe('Listing component', () => {
  it('shallow renders without crashing', () => {
    setup({});
  });
  it('calls add on rootAdd click', () => {
    const { props: { add }, wrapper } = setup({});
    wrapper.find('#rootAdd').simulate('click');
    expect(add.mock.calls).toHaveLength(1);
    expect(add.mock.calls[0][0]).toBe('Hello There');
  });
});