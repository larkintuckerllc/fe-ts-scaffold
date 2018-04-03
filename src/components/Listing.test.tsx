import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import React from 'react';
import Listing from './Listing';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const getDefaultProps = () => ({
  add: jest.fn(),
  items: ['Hello World'],
});
describe('Listing component', () => {
  it('shallow renders without crashing', () => {
    const { add, items } = getDefaultProps();
    shallow((
      <Listing
        add={add}
        items={items}
      />
    ));
  });
  it('shallow renders without crashing', () => {
    const { add, items } = getDefaultProps();
    const wrapper = shallow((
      <Listing
        add={add}
        items={items}
      />
    ));
    wrapper.find('#test_add').simulate('click');
    expect(add.mock.calls).toHaveLength(1);
    expect(add.mock.calls[0][0]).toBe('Hello World');
  });
});
