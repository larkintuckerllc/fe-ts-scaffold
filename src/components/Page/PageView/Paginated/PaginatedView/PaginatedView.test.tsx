import itemsTestData from 'APIS/items/items.testdata';
import Item, { ItemFactory, ItemRecord } from 'DUCKS/items/Item';
import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import { List } from 'immutable';
import React from 'react';
import PaginatedView from './PaginatedView';
import styles from './styles.less';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const itemsTestDataPaged = itemsTestData.slice(0, 2);
const reducer = (accumulator: List<ItemRecord>, jsonItem: Item) =>
  accumulator.push(ItemFactory(jsonItem));
const itemsSample = itemsTestDataPaged.reduce(reducer, List<ItemRecord>([])) as List<ItemRecord>;
const getDefaultProps = () => ({
  currentPage: 0,
  error: false,
  fetchItems: jest.fn(),
  items: itemsSample,
  lastPage: 1,
  requested: false,
});

describe('PaginatedView component', () => {
  it('shallow renders without crashing', () => {
    const defaultProps = getDefaultProps();
    shallow(<PaginatedView {...defaultProps} />);
  });
  it('renders differently with requested', () => {
    const { requested, ...defaultProps } = getDefaultProps();
    const wrapper = shallow(<PaginatedView {...defaultProps} requested={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders differently with not requested and error', () => {
    const { error, ...defaultProps } = getDefaultProps();
    const wrapper = shallow(<PaginatedView {...defaultProps} error={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders differently with not requested not error and 0 todos', () => {
    const { items, ...defaultProps } = getDefaultProps();
    const emptyItems = List<ItemRecord>([]);
    const wrapper = shallow(<PaginatedView {...defaultProps} items={emptyItems} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders differently with currentPage not 0', () => {
    const { currentPage, ...defaultProps } = getDefaultProps();
    const testCurrentPage = 1;
    const wrapper = shallow(<PaginatedView {...defaultProps} currentPage={testCurrentPage} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders differently with currentPage not 0 and lastPage', () => {
    const { currentPage, lastPage, ...defaultProps } = getDefaultProps();
    const testCurrentPage = 1;
    const testLastPage = 1;
    const wrapper = shallow(
      <PaginatedView {...defaultProps} currentPage={testCurrentPage} lastPage={testLastPage} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('calls fetchItems on mount', () => {
    const { currentPage, fetchItems, ...defaultProps } = getDefaultProps();
    shallow(<PaginatedView {...defaultProps} currentPage={currentPage} fetchItems={fetchItems} />);
    expect(fetchItems.mock.calls.length).toBe(1);
    expect(fetchItems.mock.calls[0][0]).toBe(currentPage);
  });

  it('calls fetchItems on next click', () => {
    const { fetchItems, lastPage, ...defaultProps } = getDefaultProps();
    const testLastPage = 1;
    const wrapper = shallow(
      <PaginatedView {...defaultProps} fetchItems={fetchItems} lastPage={testLastPage} />
    );
    const testNext = wrapper.find(`#${styles.next}`);
    testNext.simulate('click');
    const callsLength = 2;
    const nextPage = 1;
    expect(fetchItems.mock.calls).toHaveLength(callsLength);
    expect(fetchItems.mock.calls[1][0]).toBe(nextPage);
  });

  it('calls fetchItems on previous click', () => {
    const { currentPage, fetchItems, lastPage, ...defaultProps } = getDefaultProps();
    const testCurrentPage = 1;
    const testLastPage = 1;
    const wrapper = shallow(
      <PaginatedView
        {...defaultProps}
        currentPage={testCurrentPage}
        fetchItems={fetchItems}
        lastPage={testLastPage}
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
