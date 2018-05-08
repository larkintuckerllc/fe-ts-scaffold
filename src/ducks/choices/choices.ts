import choicesAAPI from 'APIS/choicesA';
import choicesBAPI from 'APIS/choicesB';
import { List } from 'immutable';
import { combineReducers } from 'redux-immutable';
import AppAction from 'STORE/AppAction';
import { AppStateRecord } from 'STORE/AppState';
import Choice, { ChoiceFactory, ChoiceRecord } from './Choice';

/*
Duck manages multiple lists of async fetched Choices in store keyed by an identifier
To first use need to create first list (see below for adding) and then:
- Update choices.test.ts
To add a new list:
- Add new identifier to ChoicesType (below), e.g., choicesA
- Add new API exposing a fetch to choicesApi (below), e.g., choicesAAPI
- Add reducer (reducers.js), e.g., choicesA: choices('choicesA'),
- Add initial state (AppState.js), e.g., choicesA: choicesStateRecordDefault,
To use new list:
- In mapStateToProps, e.g., choices: fromChoices.getChoices(state, 'choicesA'),
- In mapDispatchToProps, e.g., fetchChoices: fromChoices.fetchChoices,
- In componentDidMount, e.g., fetchChoices('choicesA')
*/

// TYPES
export type ChoiceType = 'choicesA' | 'choicesB';
const choicesApi = {
  choicesA: choicesAAPI,
  choicesB: choicesBAPI,
};

// ACTIONS
const FETCH_CHOICES_REQUEST = 'FETCH_CHOICES_REQUEST';

const FETCH_CHOICES_RESPONSE = 'FETCH_CHOICES_RESPONSE';

export interface FetchChoicesRequestAction {
  payload: ChoiceType;
  type: typeof FETCH_CHOICES_REQUEST;
}

interface FetchChoicesResponsePayload {
  response: List<ChoiceRecord> | string;
  type: ChoiceType;
}

export interface FetchChoicesResponseAction {
  type: typeof FETCH_CHOICES_RESPONSE;
  payload: FetchChoicesResponsePayload;
  error?: boolean;
}

const fetchChoicesRequest = (type: ChoiceType): FetchChoicesRequestAction => ({
  payload: type,
  type: FETCH_CHOICES_REQUEST,
});

const fetchChoicesResponse = (
  payload: FetchChoicesResponsePayload,
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

export const fetchChoices = (type: ChoiceType) => async (dispatch: (action: AppAction) => void) => {
  dispatch(fetchChoicesRequest(type));
  try {
    const api = choicesApi[type];
    const json = await api.fetch();
    const reducer = (accumulator: List<ChoiceRecord>, jsonChoice: Choice) =>
      accumulator.push(ChoiceFactory(jsonChoice));
    const choices = json.reduce(reducer, List<ChoiceRecord>([])) as List<ChoiceRecord>;
    dispatch(
      fetchChoicesResponse({
        response: choices,
        type,
      })
    );
  } catch {
    dispatch(
      fetchChoicesResponse(
        {
          response: '500',
          type,
        },
        true
      )
    );
  }
};

// REDUCER
export default (type: ChoiceType) => {
  const requested = (state: boolean, action: AppAction) => {
    switch (action.type) {
      case FETCH_CHOICES_REQUEST:
        if (action.payload !== type) {
          return state;
        }
        return true;
      case FETCH_CHOICES_RESPONSE:
        if (action.payload.type !== type) {
          return state;
        }
        return false;
      default:
        return state;
    }
  };

  const items = (state: List<Choice>, action: AppAction) => {
    switch (action.type) {
      case FETCH_CHOICES_RESPONSE:
        if (action.payload.type !== type || action.error) {
          return state;
        }
        return action.payload.response;
      default:
        return state;
    }
  };

  const errored = (state: boolean, action: AppAction) => {
    switch (action.type) {
      case FETCH_CHOICES_REQUEST:
        if (action.payload !== type) {
          return state;
        }
        return false;
      case FETCH_CHOICES_RESPONSE:
        if (action.payload.type !== type) {
          return state;
        }
        return action.error ? true : false;
      default:
        return state;
    }
  };

  return combineReducers({
    errored,
    items,
    requested,
  });
};

// SELECTORS
export const getChoicesRequested = (state: AppStateRecord, type: ChoiceType) =>
  state.get(type, null).get('requested', null);

export const getChoicesError = (state: AppStateRecord, type: ChoiceType) =>
  state.get(type, null).get('errored', null);

export const getChoices = (state: AppStateRecord, type: ChoiceType) =>
  state.get(type, null).get('items', null);
