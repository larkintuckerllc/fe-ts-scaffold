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
    const { currentPage, error, fetchItems, lastPage, requested, items } = getDefaultProps();
    shallow(
      <InfiniteScrollView
        currentPage={currentPage}
        error={error}
        fetchItems={fetchItems}
        items={items}
        lastPage={lastPage}
        requested={requested}
      />
    );
  });

  it('renders differently with not requested and error', () => {
    const { currentPage, fetchItems, lastPage, items, requested } = getDefaultProps();
    const wrapper = shallow(
      <InfiniteScrollView
        currentPage={currentPage}
        error={true}
        fetchItems={fetchItems}
        items={items}
        lastPage={lastPage}
        requested={requested}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('calls fetchItems on mount', () => {
    const { currentPage, error, fetchItems, items, lastPage, requested } = getDefaultProps();
    shallow(
      <InfiniteScrollView
        currentPage={currentPage}
        error={error}
        fetchItems={fetchItems}
        items={items}
        lastPage={lastPage}
        requested={requested}
      />
    );
    expect(fetchItems.mock.calls.length).toBe(1);
    expect(fetchItems.mock.calls[0][0]).toBe(currentPage);
  });
});
