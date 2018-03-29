import { List } from 'immutable';
import { Dispatch } from 'redux';
import { combineReducers } from 'redux-immutable';
import { AppAction } from 'STORE/reducers';

const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
const FETCH_TODOS_RESPONSE = 'FETCH_TODOS_RESPONSE';
interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userID: number;
}
export interface FetchTodosRequestAction {
  type: 'FETCH_TODOS_REQUEST';
}
export interface FetchTodosResponseAction {
  type: 'FETCH_TODOS_RESPONSE';
  payload: Todo[];
}
function fetchTodosRequest():  FetchTodosRequestAction {
  return ({
    type: FETCH_TODOS_REQUEST,
  });
} 
function fetchTodosResponse(payload: Todo[]):  FetchTodosResponseAction {
  return ({
    type: FETCH_TODOS_RESPONSE,
    payload,
  });
} 
export const fetchTodos = () => (dispatch: Dispatch<AppAction>) => {
  dispatch(fetchTodosRequest());
  dispatch(fetchTodosResponse([]));
};
/*
export const fetchPhrase = () => (dispatch) => {
  dispatch(fetchPhraseRequest());
  fromAPI.getPhrase()
    .then((value) => {
      dispatch(fetchPhraseResponse(value));
    })
    .catch((err) => {
      dispatch(fetchPhraseResponse(err));
    });
};
*/
function ids (state = List([]), action: AppAction) {
  switch (action.type) {
    case FETCH_TODOS_RESPONSE:
      return List(action.payload.map((o: Todo) => o.id));
    default:
      return state;
  }
};
export default combineReducers({
  ids,
});

/*
export function getCounter(state: AppState) {
  return state.get('counter');
}
import { createAction, handleActions } from 'redux-actions';
import * as fromAPI from '../apis/phrase';

// ACTION CREATORS
export const fetchPhrase = () => (dispatch) => {
  dispatch(fetchPhraseRequest());
  fromAPI.getPhrase()
    .then((value) => {
      dispatch(fetchPhraseResponse(value));
    })
    .catch((err) => {
      dispatch(fetchPhraseResponse(err));
    });
};
// REDUCERS
const requested = handleActions({
  [fetchPhraseRequest]() {
    return true;
  },
  [fetchPhraseResponse]() {
    return false;
  },
}, false);
const value = handleActions({
  [fetchPhraseResponse]: {
    next(state, { payload }) {
      return payload;
    },
  },
  [clearPhrase]() {
    return null;
  },
}, null);
const error = handleActions({
  [fetchPhraseResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    },
  },
  [clearPhrase]() {
    return null;
  },
}, null);
export default combineReducers({
  error,
  requested,
  value,
});
// SELECTORS
export const getPhrase = state => state.phrase.value;
export const getPhraseError = state => state.phrase.error;
export const getPhraseRequested = state => state.phrase.requested;
*/