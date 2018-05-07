import choicesAAPI from 'APIS/choicesA';
import { List } from 'immutable';
import { combineReducers } from 'redux-immutable';
import AppAction from 'STORE/AppAction';
import { AppStateRecord } from 'STORE/AppState';
import Choice, { ChoiceFactory, ChoiceRecord } from './Choice';

// ACTIONS
const FETCH_CHOICES_REQUEST = 'FETCH_CHOICES_REQUEST';

const FETCH_CHOICES_RESPONSE = 'FETCH_CHOICES_RESPONSE';

export interface FetchChoicesRequestAction {
  type: typeof FETCH_CHOICES_REQUEST;
}

export interface FetchChoicesResponseAction {
  type: typeof FETCH_CHOICES_RESPONSE;
  payload: List<ChoiceRecord> | string;
  error?: boolean;
}

const fetchChoicesRequest = (): FetchChoicesRequestAction => ({
  type: FETCH_CHOICES_REQUEST,
});

const fetchChoicesResponse = (
  payload: List<ChoiceRecord> | string,
  error?: boolean
): FetchChoicesResponseAction =>
  error
    ? {
        error: true,
        payload,
        type: FETCH_CHOICES_RESPONSE,
      }
    : {
        payload,
        type: FETCH_CHOICES_RESPONSE,
      };

export const fetchChoices = () => async (dispatch: (action: AppAction) => void) => {
  dispatch(fetchChoicesRequest());
  try {
    const json = await choicesAAPI.fetch();
    const reducer = (accumulator: List<ChoiceRecord>, jsonChoice: Choice) =>
      accumulator.push(ChoiceFactory(jsonChoice));
    const list = json.reduce(reducer, List<ChoiceRecord>([])) as List<ChoiceRecord>;
    dispatch(fetchChoicesResponse(list));
  } catch {
    dispatch(fetchChoicesResponse('500', true));
  }
};

// REDUCER
const requested = (state: boolean, action: AppAction) => {
  switch (action.type) {
    case FETCH_CHOICES_REQUEST:
      return true;
    case FETCH_CHOICES_RESPONSE:
      return false;
    default:
      return state;
  }
};

const items = (state: List<Choice>, action: AppAction) => {
  switch (action.type) {
    case FETCH_CHOICES_RESPONSE:
      return action.payload;
    default:
      return state;
  }
};

const errored = (state: boolean, action: AppAction) => {
  switch (action.type) {
    case FETCH_CHOICES_REQUEST:
      return false;
    case FETCH_CHOICES_RESPONSE:
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
export const getChoicesRequested = (state: AppStateRecord) =>
  state.get('choices', null).get('requested', null);

export const getChoicesError = (state: AppStateRecord) =>
  state.get('choices', null).get('errored', null);

export const getChoices = (state: AppStateRecord) => state.get('choices', null).get('items', null);
