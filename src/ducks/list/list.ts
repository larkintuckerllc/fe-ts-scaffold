import listAAPI from 'APIS/listAs';
import { List } from 'immutable';
import { combineReducers } from 'redux-immutable';
import AppAction from 'STORE/AppAction';
import { AppStateRecord } from 'STORE/AppState';
import ListItem, { ListItemFactory, ListItemRecord } from './ListItem';

// ACTIONS
const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST';

const FETCH_LIST_RESPONSE = 'FETCH_LIST_RESPONSE';

export interface FetchListRequestAction {
  type: typeof FETCH_LIST_REQUEST;
}

export interface FetchListResponseAction {
  type: typeof FETCH_LIST_RESPONSE;
  payload: List<ListItemRecord> | string;
  error?: boolean;
}

const fetchListRequest = (): FetchListRequestAction => ({
  type: FETCH_LIST_REQUEST,
});

const fetchListResponse = (
  payload: List<ListItemRecord> | string,
  error?: boolean
): FetchListResponseAction =>
  error
    ? {
        error: true,
        payload,
        type: FETCH_LIST_RESPONSE,
      }
    : {
        payload,
        type: FETCH_LIST_RESPONSE,
      };

export const fetchList = () => async (dispatch: (action: AppAction) => void) => {
  dispatch(fetchListRequest());
  try {
    const json = await listAAPI.fetch();
    const reducer = (accumulator: List<ListItemRecord>, jsonListItem: ListItem) =>
      accumulator.push(ListItemFactory(jsonListItem));
    const list = json.reduce(reducer, List<ListItemRecord>([])) as List<ListItemRecord>;
    dispatch(fetchListResponse(list));
  } catch {
    dispatch(fetchListResponse('500', true));
  }
};

// REDUCER
const requested = (state: boolean, action: AppAction) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return true;
    case FETCH_LIST_RESPONSE:
      return false;
    default:
      return state;
  }
};

const items = (state: List<ListItem>, action: AppAction) => {
  switch (action.type) {
    case FETCH_LIST_RESPONSE:
      return action.payload;
    default:
      return state;
  }
};

const errored = (state: boolean, action: AppAction) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return false;
    case FETCH_LIST_RESPONSE:
      return action.error ? true : false;
    default:
      return state;
  }
};

export default combineReducers({
  errored,
  items,
  requested,
});

// SELECTORS
export const getListRequested = (state: AppStateRecord) =>
  state.get('list', null).get('requested', null);

export const getListError = (state: AppStateRecord) => state.get('list', null).get('errored', null);

export const getList = (state: AppStateRecord) => state.get('list', null).get('items', null);
