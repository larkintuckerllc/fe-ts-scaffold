import { List, Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { unknown } from 'STORE/AppAction';
import { appStateInitial } from 'STORE/AppState';
import Item from './Item';
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
import { itemsInitialState } from './ItemsState';

jest.mock('APIS/items');

describe('items duck', () => {
  const itemDefault = {
    id: 0,
    name: 'name',
  };
  const itemSample = new Item(itemDefault);
  const itemsSample = List([itemSample]);
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
      pageCount: 1,
    },
    type: 'FETCH_ITEMS_RESPONSE',
  };
  const responseError = {
    error: true,
    payload: '500',
    type: 'FETCH_ITEMS_RESPONSE',
  };
  let byIdSample = Map<number, Item>();
  byIdSample = byIdSample.set(itemSample.get('id'), itemSample);
  const idsSample = List([itemSample.get('id')]);
  let itemsStateSample = itemsInitialState.set('byId', byIdSample);
  const page = List<number>([0]);
  let pages = Map<number, List<number>>();
  pages = pages.set(0, page);
  itemsStateSample = itemsStateSample.set('ids', idsSample);
  itemsStateSample = itemsStateSample.set('lastPage', 0);
  itemsStateSample = itemsStateSample.set('pages', pages);
  const appStateSample = appStateInitial.set('items', itemsStateSample);

  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  // ACTIONS
  it('fetchItems success should dispatch request and response - success actions', () => {
    const dispatch = jest.fn();
    const getState = () => appStateInitial;
    return fetchItems(0)(dispatch, getState).then(() => {
      const callsLength = 3;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(currentPage);
      expect(dispatch.mock.calls[1][0]).toEqual(request);
      expect(dispatch.mock.calls[2][0]).toEqual(responseSuccess);
    });
  });

  it('fetchItems success should dispatch request and response - success actions - cached', () => {
    const dispatch = jest.fn();
    const getState = () => appStateSample;
    return fetchItems(0)(dispatch, getState).then(() => {
      const callsLength = 1;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(currentPage);
    });
  });

  it('fetchTodos success should dispatch request and response - error actions', () => {
    const dispatch = jest.fn();
    const apisItems = require('APIS/items');
    apisItems.setError(true);
    const callsLength = 3;
    const getState = () => appStateInitial;
    return fetchItems(0)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(currentPage);
      expect(dispatch.mock.calls[1][0]).toEqual(request);
      expect(dispatch.mock.calls[2][0]).toEqual(responseError);
    });
  });

  // REDUCERS
  describe('reducer', () => {
    it('should ignore unknown actions', () => {
      const action = unknown();
      expect(items(itemsInitialState, action)).toBe(itemsInitialState);
    });

    it('should handle FETCH_TODOS_REQUEST', () => {
      const result = itemsInitialState.set('requested', true);
      expect(items(itemsInitialState, request)).toEqualImmutable(result);
    });

    it('should handle FETCH_TODOS_RESPONSE success', () => {
      const state = itemsInitialState.set('requested', true);
      expect(items(state, responseSuccess)).toEqualImmutable(itemsStateSample);
    });

    it('should handle FETCH_TODOS_RESPONSE error', () => {
      const state = itemsInitialState.set('requested', true);
      const nextState = itemsInitialState.set('errored', true);
      expect(items(state, responseError)).toEqualImmutable(nextState);
    });

    it('should handle SET_CURRENT_PAGE', () => {
      const state = itemsInitialState.set('currentPage', 1);
      const nextState = itemsInitialState.set('currentPage', 0);
      expect(items(state, currentPage)).toEqualImmutable(nextState);
    });

    // SELECTORS
    it('getItemsRequested should return', () => {
      const result = false;
      expect(getItemsRequested(appStateInitial)).toEqual(result);
    });

    it('getItemsError should return', () => {
      const result = false;
      expect(getItemsError(appStateInitial)).toEqual(result);
    });

    it('getItem should return', () => {
      const id = itemSample.get('id');
      expect(getItem(appStateSample, id)).toEqualImmutable(itemSample);
    });

    it('getItems should return', () => {
      const result = List([itemSample]);
      expect(getItems(appStateSample)).toEqualImmutable(result);
    });

    it('getItemsCurrentPage should return', () => {
      const result = 0;
      expect(getItemsCurrentPage(appStateSample)).toEqualImmutable(result);
    });

    it('getItemsLastPage should return', () => {
      const result = 0;
      expect(getItemsLastPage(appStateSample)).toEqualImmutable(result);
    });

    it('getItemsPages should return with no page', () => {
      const result = List([]);
      expect(getItemsPaged(appStateInitial)).toEqualImmutable(result);
    });

    it('getItemsPages should return with page', () => {
      const result = List([itemSample]);
      expect(getItemsPaged(appStateSample)).toEqualImmutable(result);
    });
  });
});
