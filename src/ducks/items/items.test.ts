import itemsAPI from 'APIS/items';
import itemsTestData from 'APIS/items/items.testdata.json';
import { List, Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { unknown } from 'STORE/AppAction';
import { appStateRecordDefault } from 'STORE/AppState';
import Item, { ItemFactory, ItemRecord } from './Item';
import items, {
  fetchItems,
  getItem,
  getItems,
  getItemsCurrentPage,
  getItemsError,
  getItemsLastPage,
  getItemsPaged,
  getItemsRequested,
} from './items';
import { itemsStateRecordDefault } from './ItemsState';

describe('items duck', () => {
  const itemSample = ItemFactory(itemsTestData[0]);
  const itemsTestDataPaged = itemsTestData.slice(0, 2);
  const reducer = (accumulator: List<ItemRecord>, jsonItem: Item) =>
    accumulator.push(ItemFactory(jsonItem));
  const itemsSample = itemsTestDataPaged.reduce(reducer, List<ItemRecord>([])) as List<ItemRecord>;
  const currentPage = {
    payload: 0,
    type: 'SET_ITEMS_CURRENT_PAGE',
  };
  const request = {
    type: 'FETCH_ITEMS_REQUEST',
  };
  const responseSuccess = {
    payload: {
      items: itemsSample,
      page: 0,
      pageCount: 3,
    },
    type: 'FETCH_ITEMS_RESPONSE',
  };
  const responseError = {
    error: true,
    payload: '500',
    type: 'FETCH_ITEMS_RESPONSE',
  };
  const reducerById = (accumulator: Map<number, ItemRecord>, item: ItemRecord) =>
    accumulator.set(item.get('id', null), item);
  const byIdSample = itemsSample.reduce(reducerById, Map<number, ItemRecord>());
  const idsSample = List([0, 1]);
  const page = List<number>([0, 1]);
  let pages = Map<number, List<number>>();
  pages = pages.set(0, page);
  const itemsStateSample = itemsStateRecordDefault
    .set('byId', byIdSample)
    .set('ids', idsSample)
    .set('lastPage', 2)
    .set('pages', pages);
  const appStateSample = appStateRecordDefault.set('items', itemsStateSample);
  beforeEach(() => {
    jest.addMatchers(matchers);
    jest.resetModules();
    jest.resetAllMocks();
  });

  // ACTIONS
  it('fetchItems success should dispatch request and response - success actions', () => {
    itemsAPI.fetch = jest.fn().mockResolvedValue({
      count: itemsTestData.length,
      results: itemsTestDataPaged,
    });
    const dispatch = jest.fn();
    const getState = () => appStateRecordDefault;
    return fetchItems(0)(dispatch, getState).then(() => {
      const callsLength = 3;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(currentPage);
      expect(dispatch.mock.calls[1][0]).toEqual(request);
      expect(dispatch.mock.calls[2][0]).toEqual(responseSuccess);
    });
  });
  it('fetchItems success should dispatch request and response - success actions - cached', () => {
    itemsAPI.fetch = jest.fn().mockResolvedValue({
      count: 1,
      results: itemsTestData,
    });
    const dispatch = jest.fn();
    const getState = () => appStateSample;
    return fetchItems(0)(dispatch, getState).then(() => {
      const callsLength = 1;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(currentPage);
    });
  });

  it('fetchTodos success should dispatch request and response - error actions', () => {
    itemsAPI.fetch = jest.fn().mockRejectedValue(new Error('500'));
    const dispatch = jest.fn();
    const getState = () => appStateRecordDefault;
    return fetchItems(0)(dispatch, getState).then(() => {
      const callsLength = 3;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(currentPage);
      expect(dispatch.mock.calls[1][0]).toEqual(request);
      expect(dispatch.mock.calls[2][0]).toEqual(responseError);
    });
  });

  describe('reducer', () => {
    it('should ignore unknown actions', () => {
      const action = unknown();
      expect(items(itemsStateRecordDefault, action)).toBe(itemsStateRecordDefault);
    });

    it('should handle FETCH_TODOS_REQUEST', () => {
      const result = itemsStateRecordDefault.set('requested', true);
      expect(items(itemsStateRecordDefault, request)).toEqualImmutable(result);
    });

    it('should handle FETCH_TODOS_RESPONSE success', () => {
      const state = itemsStateRecordDefault.set('requested', true);
      expect(items(state, responseSuccess)).toEqualImmutable(itemsStateSample);
    });

    it('should handle FETCH_TODOS_RESPONSE error', () => {
      const state = itemsStateRecordDefault.set('requested', true);
      const nextState = itemsStateRecordDefault.set('errored', true);
      expect(items(state, responseError)).toEqualImmutable(nextState);
    });

    it('should handle SET_CURRENT_PAGE', () => {
      const state = itemsStateRecordDefault.set('currentPage', 1);
      const nextState = itemsStateRecordDefault.set('currentPage', 0);
      expect(items(state, currentPage)).toEqualImmutable(nextState);
    });
  });

  describe('selectors', () => {
    it('getItemsRequested should return', () => {
      const result = false;
      expect(getItemsRequested(appStateRecordDefault)).toEqual(result);
    });

    it('getItemsError should return', () => {
      const result = false;
      expect(getItemsError(appStateRecordDefault)).toEqual(result);
    });

    it('getItem should return', () => {
      const id = itemSample.get('id', null);
      expect(getItem(appStateSample, id)).toEqualImmutable(itemSample);
    });

    it('getItems should return', () => {
      const result = itemsSample;
      expect(getItems(appStateSample)).toEqualImmutable(result);
    });

    it('getItemsCurrentPage should return', () => {
      const result = 0;
      expect(getItemsCurrentPage(appStateSample)).toEqualImmutable(result);
    });

    it('getItemsLastPage should return', () => {
      const result = 2;
      expect(getItemsLastPage(appStateSample)).toEqualImmutable(result);
    });

    it('getItemsPages should return with no page', () => {
      const result = List([]);
      expect(getItemsPaged(appStateRecordDefault)).toEqualImmutable(result);
    });

    it('getItemsPages should return with page', () => {
      const result = itemsSample;
      expect(getItemsPaged(appStateSample)).toEqualImmutable(result);
    });
  });
});
