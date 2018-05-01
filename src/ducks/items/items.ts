import * as fromItems from 'APIS/items';
import { List, Map, Record } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';
import AppAction from 'STORE/AppAction';
import AppState from 'STORE/AppState';
import Item, { ItemFactory, ItemRecord } from './Item';

const PAGE_SIZE = 2;

// ACTIONS
const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';

const FETCH_ITEMS_RESPONSE = 'FETCH_ITEMS_RESPONSE';

const SET_ITEMS_CURRENT_PAGE = 'SET_ITEMS_CURRENT_PAGE';

interface FetchItemsResponseActionPayload {
  items: List<ItemRecord>;
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
  getState: () => Record<AppState>
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
    const reducer = (accumulator: List<ItemRecord>, jsonItem: Item) =>
      accumulator.push(ItemFactory(jsonItem));
    const items = json.results.reduce(reducer, List<ItemRecord>([])) as List<ItemRecord>;
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

const byId = (state: Map<number, ItemRecord>, action: AppAction) => {
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      if (action.error) {
        return state;
      }
      const reducer = (accumulator: Map<number, ItemRecord>, item: ItemRecord) =>
        accumulator.set(item.get('id', null), item);
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
      return state.merge(List(payload.items.map((o: ItemRecord) => o.get('id', null))));
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
      if (action.error) {
        return state;
      }
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
      const pageIds = List<number>(payload.items.map((o: ItemRecord) => o.get('id', null)));
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
export const getItemsRequested = (state: Record<AppState>) =>
  state.get('items', null).get('requested', null);

export const getItemsError = (state: Record<AppState>) =>
  state.get('items', null).get('errored', null);

export const getItem = (state: Record<AppState>, id: number) => {
  return state
    .get('items', null)
    .get('byId', null)
    .get(id);
};

const getItemsById = (state: Record<AppState>) => state.get('items', null).get('byId', null);

const getItemsIds = (state: Record<AppState>) => state.get('items', null).get('ids', null);

export const getItems = createSelector(
  [getItemsById, getItemsIds],
  (pById, pIds) => pIds.map(o => pById.get(o)) as List<ItemRecord>
);

export const getItemsCurrentPage = (state: Record<AppState>) =>
  state.get('items', null).get('currentPage', null);

export const getItemsLastPage = (state: Record<AppState>) =>
  state.get('items', null).get('lastPage', null);

const getIsPageFetched = (state: Record<AppState>, page: number) => {
  return (
    state
      .get('items', null)
      .get('pages', null)
      .get(page) !== undefined
  );
};
const getItemsIdsPaged = (state: Record<AppState>) => {
  const page = state.get('items', null).get('currentPage', null);
  const pageIds = state
    .get('items', null)
    .get('pages', null)
    .get(page);
  if (pageIds === undefined) {
    return List<number>([]);
  }
  return pageIds;
};

export const getItemsPaged = createSelector(
  [getItemsById, getItemsIdsPaged],
  (pById, pIds) => pIds.map(o => pById.get(o)) as List<ItemRecord>
);
