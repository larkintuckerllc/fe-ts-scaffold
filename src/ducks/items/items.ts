import * as fromItems from 'APIS/items';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';
import AppAction from 'STORE/AppAction';
import AppState from 'STORE/AppState';
import Item, { ItemJS } from './Item';

const PAGE_SIZE = 2;

// ACTIONS
const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';

const FETCH_ITEMS_RESPONSE = 'FETCH_ITEMS_RESPONSE';

const SET_ITEMS_CURRENT_PAGE = 'SET_ITEMS_CURRENT_PAGE';

interface FetchItemsResponseActionPayload {
  items: List<Item>;
  page: number;
  pageCount: number;
}

export interface FetchItemsRequestAction {
  type: typeof FETCH_ITEMS_REQUEST;
}

export interface FetchItemsResponseAction {
  type: typeof FETCH_ITEMS_RESPONSE;
  payload: FetchItemsResponseActionPayload | string;
  error?: boolean;
}

export interface SetItemsCurrentPageAction {
  type: typeof SET_ITEMS_CURRENT_PAGE;
  payload: number;
}

const fetchItemsRequest = (): FetchItemsRequestAction => ({
  type: FETCH_ITEMS_REQUEST,
});

const setItemsCurrentPage = (page: number): SetItemsCurrentPageAction => ({
  payload: page,
  type: SET_ITEMS_CURRENT_PAGE,
});

const fetchItemsResponse = (
  payload: FetchItemsResponseActionPayload | string,
  error?: boolean
): FetchItemsResponseAction =>
  error
    ? {
        error: true,
        payload,
        type: FETCH_ITEMS_RESPONSE,
      }
    : {
        payload,
        type: FETCH_ITEMS_RESPONSE,
      };

export const fetchItems = (page: number) => async (
  dispatch: (action: AppAction) => void,
  getState: () => AppState
) => {
  const state = getState();
  const offset = page * PAGE_SIZE;
  dispatch(setItemsCurrentPage(page));
  if (getIsPageFetched(state, page)) {
    return;
  }
  dispatch(fetchItemsRequest());
  try {
    const json = await fromItems.fetchItems({
      limit: PAGE_SIZE,
      offset,
    });
    const reducer = (accumulator: List<Item>, jsonItem: ItemJS) =>
      accumulator.push(new Item(jsonItem));
    const items = json.results.reduce(reducer, List<Item>([])) as List<Item>;
    const pageCount = Math.ceil(json.count / PAGE_SIZE);
    dispatch(fetchItemsResponse({ items, page, pageCount }));
  } catch {
    dispatch(fetchItemsResponse('500', true));
  }
};

// REDUCER
const requested = (state: boolean, action: AppAction) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return true;
    case FETCH_ITEMS_RESPONSE:
      return false;
    default:
      return state;
  }
};

const byId = (state: Map<number, Item>, action: AppAction) => {
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      if (action.error) {
        return state;
      }
      const reducer = (accumulator: Map<number, Item>, item: Item) =>
        accumulator.set(item.get('id'), item);
      const payload = action.payload as FetchItemsResponseActionPayload;
      return payload.items.reduce(reducer, state);
    default:
      return state;
  }
};

const ids = (state: List<number>, action: AppAction) => {
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      if (action.error) {
        return state;
      }
      const payload = action.payload as FetchItemsResponseActionPayload;
      return state.merge(List(payload.items.map((o: Item) => o.get('id'))));
    default:
      return state;
  }
};

const errored = (state: boolean, action: AppAction) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return false;
    case FETCH_ITEMS_RESPONSE:
      return action.error ? true : false;
    default:
      return state;
  }
};

const currentPage = (state: number, action: AppAction) => {
  switch (action.type) {
    case SET_ITEMS_CURRENT_PAGE:
      return action.payload;
    default:
      return state;
  }
};

const lastPage = (state: number, action: AppAction) => {
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      const payload = action.payload as FetchItemsResponseActionPayload;
      return payload.pageCount - 1;
    default:
      return state;
  }
};

const pages = (state: Map<number, List<number>>, action: AppAction) => {
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      if (action.error) {
        return state;
      }
      const payload = action.payload as FetchItemsResponseActionPayload;
      const pageIds = List<number>(payload.items.map((o: Item) => o.get('id')));
      return state.set(payload.page, pageIds);
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  currentPage,
  errored,
  ids,
  lastPage,
  pages,
  requested,
});

// SELECTORS
export const getItemsRequested = (state: AppState) => state.get('items').get('requested');

export const getItemsError = (state: AppState) => state.get('items').get('errored');

export const getItem = (state: AppState, id: number) => {
  return state
    .get('items')
    .get('byId')
    .get(id);
};

const getItemsById = (state: AppState) => state.get('items').get('byId');

const getItemsIds = (state: AppState) => state.get('items').get('ids');

export const getItems = createSelector(
  [getItemsById, getItemsIds],
  (pById, pIds) => pIds.map(o => pById.get(o)) as List<Item>
);

export const getCurrentPage = (state: AppState) => state.get('items').get('currentPage');

export const getLastPage = (state: AppState) => state.get('items').get('lastPage');

const getIsPageFetched = (state: AppState, page: number) => {
  return (
    state
      .get('items')
      .get('pages')
      .get(page) !== undefined
  );
};
const getItemsIdsPaged = (state: AppState) => {
  const page = state.get('items').get('currentPage');
  const pageIds = state
    .get('items')
    .get('pages')
    .get(page);
  if (pageIds === undefined) {
    return List<number>([]);
  }
  return pageIds;
};

export const getItemsPaged = createSelector(
  [getItemsById, getItemsIdsPaged],
  (pById, pIds) => pIds.map(o => pById.get(o)) as List<Item>
);
