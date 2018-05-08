import parentChoicesAPI from 'APIS/parentChoices';
import { List } from 'immutable';
import { combineReducers } from 'redux-immutable';
import AppAction from 'STORE/AppAction';
import { AppStateRecord } from 'STORE/AppState';
import ParentChoice, { ParentChoiceFactory, ParentChoiceRecord } from './ParentChoice';

// ACTIONS
const FETCH_PARENT_CHOICES_REQUEST = 'FETCH_PARENT_CHOICES_REQUEST';

const FETCH_PARENT_CHOICES_RESPONSE = 'FETCH_PARENT_CHOICES_RESPONSE';

export interface FetchParentChoicesRequestAction {
  type: typeof FETCH_PARENT_CHOICES_REQUEST;
}

export interface FetchParentChoicesResponseAction {
  type: typeof FETCH_PARENT_CHOICES_RESPONSE;
  payload: List<ParentChoiceRecord> | string;
  error?: boolean;
}

const fetchParentChoicesRequest = (): FetchParentChoicesRequestAction => ({
  type: FETCH_PARENT_CHOICES_REQUEST,
});

const fetchParentChoicesResponse = (
  payload: List<ParentChoiceRecord> | string,
  error?: boolean
): FetchParentChoicesResponseAction =>
  error
    ? {
        error: true,
        payload,
        type: FETCH_PARENT_CHOICES_RESPONSE,
      }
    : {
        payload,
        type: FETCH_PARENT_CHOICES_RESPONSE,
      };

export const fetchParentChoices = () => async (dispatch: (action: AppAction) => void) => {
  dispatch(fetchParentChoicesRequest());
  try {
    const json = await parentChoicesAPI.fetch();
    const reducer = (accumulator: List<ParentChoiceRecord>, jsonParentChoice: ParentChoice) =>
      accumulator.push(ParentChoiceFactory(jsonParentChoice));
    const parentChoices = json.reduce(reducer, List<ParentChoiceRecord>([])) as List<
      ParentChoiceRecord
    >;
    dispatch(fetchParentChoicesResponse(parentChoices));
  } catch {
    dispatch(fetchParentChoicesResponse('500', true));
  }
};

// REDUCER
const requested = (state: boolean, action: AppAction) => {
  switch (action.type) {
    case FETCH_PARENT_CHOICES_REQUEST:
      return true;
    case FETCH_PARENT_CHOICES_RESPONSE:
      return false;
    default:
      return state;
  }
};

const items = (state: List<ParentChoiceRecord>, action: AppAction) => {
  switch (action.type) {
    case FETCH_PARENT_CHOICES_RESPONSE:
      if (action.error) {
        return state;
      }
      return action.payload;
    default:
      return state;
  }
};

const errored = (state: boolean, action: AppAction) => {
  switch (action.type) {
    case FETCH_PARENT_CHOICES_REQUEST:
      return false;
    case FETCH_PARENT_CHOICES_RESPONSE:
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
export const getParentChoicesRequested = (state: AppStateRecord) =>
  state.get('todos', null).get('requested', null);

export const getParentChoicesError = (state: AppStateRecord) =>
  state.get('todos', null).get('errored', null);

export const getParentChoices = (state: AppStateRecord) =>
  state.get('parentChoices', null).get('items', null);
