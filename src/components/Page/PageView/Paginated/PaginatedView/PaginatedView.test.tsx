import Item, { ItemFactory } from 'DUCKS/items/Item';
import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import { List, Record } from 'immutable';
import React from 'react';
import PaginatedView from './PaginatedView';
import styles from './styles.less';

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

describe('PaginatedView component', () => {
  it('shallow renders without crashing', () => {
    const { currentPage, error, fetchItems, lastPage, requested, items } = getDefaultProps();
    shallow(
      <PaginatedView
        currentPage={currentPage}
        error={error}
        fetchItems={fetchItems}
        items={items}
        lastPage={lastPage}
        requested={requested}
      />
    );
  });
  it('renders differently with requested', () => {
    const { currentPage, error, fetchItems, lastPage, items } = getDefaultProps();
    const wrapper = shallow(
      <PaginatedView
        currentPage={currentPage}
        error={error}
        fetchItems={fetchItems}
        items={items}
        lastPage={lastPage}
        requested={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders differently with not requested and error', () => {
    const { currentPage, fetchItems, lastPage, items, requested } = getDefaultProps();
    const wrapper = shallow(
      <PaginatedView
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

  it('renders differently with not requested not error and 0 todos', () => {
    const { currentPage, error, fetchItems, lastPage, requested } = getDefaultProps();
    const items = List<Record<Item>>([]);
    const wrapper = shallow(
      <PaginatedView
        currentPage={currentPage}
        error={error}
        fetchItems={fetchItems}
        items={items}
        lastPage={lastPage}
        requested={requested}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders differently with currentPage not 0', () => {
    const { error, fetchItems, items, lastPage, requested } = getDefaultProps();
    const wrapper = shallow(
      <PaginatedView
        currentPage={1}
        error={error}
        fetchItems={fetchItems}
        items={items}
        lastPage={lastPage}
        requested={requested}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders differently with currentPage not 0 and lastPage', () => {
    const { error, fetchItems, items, requested } = getDefaultProps();
    const wrapper = shallow(
      <PaginatedView
        currentPage={1}
        error={error}
        fetchItems={fetchItems}
        items={items}
        lastPage={1}
        requested={requested}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('calls fetchTodos on mount', () => {
    const { currentPage, error, fetchItems, items, lastPage, requested } = getDefaultProps();
    shallow(
      <PaginatedView
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

  it('calls fetchItems on next click', () => {
    const { currentPage, error, fetchItems, items, requested } = getDefaultProps();
    const wrapper = shallow(
      <PaginatedView
        currentPage={currentPage}
        error={error}
        fetchItems={fetchItems}
        items={items}
        lastPage={1}
        requested={requested}
      />
    );
    const testNext = wrapper.find(`#${styles.next}`);
    testNext.simulate('click');
    const callsLength = 2;
    const nextPage = 1;
    expect(fetchItems.mock.calls).toHaveLength(callsLength);
    expect(fetchItems.mock.calls[1][0]).toBe(nextPage);
  });

  it('calls fetchItems on previous click', () => {
    const { error, fetchItems, items, requested } = getDefaultProps();
    const wrapper = shallow(
      <PaginatedView
        currentPage={1}
        error={error}
        fetchItems={fetchItems}
        items={items}
        lastPage={1}
        requested={requested}
      />
    );
    const testPrevious = wrapper.find(`#${styles.previous}`);
    testPrevious.simulate('click');
    const callsLength = 2;
    const previousPage = 0;
    expect(fetchItems.mock.calls).toHaveLength(callsLength);
    expect(fetchItems.mock.calls[1][0]).toBe(previousPage);
  });
});
