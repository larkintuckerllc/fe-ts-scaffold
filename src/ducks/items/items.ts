import * as fromItems from 'APIS/items';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';
import AppAction from 'STORE/AppAction';
import AppState from 'STORE/AppState';
import Item, { ItemJS } from './Item';

// ACTIONS
const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';

const FETCH_ITEMS_RESPONSE = 'FETCH_ITEMS_RESPONSE';

export interface FetchItemsRequestAction {
  type: typeof FETCH_ITEMS_REQUEST;
}

export interface FetchItemsResponseAction {
  type: typeof FETCH_ITEMS_RESPONSE;
  payload: List<Item> | string;
  error?: boolean;
}

const fetchItemsRequest = (): FetchItemsRequestAction => ({
  type: FETCH_ITEMS_REQUEST,
});

const fetchItemsResponse = (
  payload: List<Item> | string,
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

export const fetchItems = () => async (dispatch: (action: AppAction) => void) => {
  dispatch(fetchItemsRequest());
  try {
    const json = await fromItems.fetchItems();
    const reducer = (accumulator: List<Item>, jsonItem: ItemJS) =>
      accumulator.push(new Item(jsonItem));
    const items = json.results.reduce(reducer, List<Item>([])) as List<Item>;
    dispatch(fetchItemsResponse(items));
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
      const payload = action.payload as List<Item>;
      return payload.reduce(reducer, state);
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
      const payload = action.payload as List<Item>;
      return List(payload.map((o: Item) => o.get('id')));
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

export default combineReducers({
  byId,
  errored,
  ids,
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
