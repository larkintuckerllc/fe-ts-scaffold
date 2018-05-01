import { ItemFactory } from 'DUCKS/items/Item';
import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import { List } from 'immutable';
import React from 'react';
import InfiniteScrollView from './InfiniteScrollView';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const itemDefault = {
  id: 0,
  name: 'name',
};
const sampleItem = ItemFactory(itemDefault);
const sampleItems = List([sampleItem]);
const getDefaultProps = () => ({
  currentPage: 0,
  error: false,
  fetchItems: jest.fn(),
  items: sampleItems,
  lastPage: 0,
  requested: false,
});

describe('InfiniteScrollView component', () => {
  window.scroll = jest.fn();

  it('shallow renders without crashing', () => {
    const defaultProps = getDefaultProps();
    shallow(<InfiniteScrollView {...defaultProps} />);
  });

  it('renders differently with not requested and error', () => {
    const { error, ...defaultProps } = getDefaultProps();
    const wrapper = shallow(<InfiniteScrollView {...defaultProps} error={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls fetchItems on mount', () => {
    const { currentPage, fetchItems, ...defaultProps } = getDefaultProps();
    shallow(
      <InfiniteScrollView {...defaultProps} currentPage={currentPage} fetchItems={fetchItems} />
    );
    expect(fetchItems.mock.calls.length).toBe(1);
    expect(fetchItems.mock.calls[0][0]).toBe(currentPage);
  });
});
