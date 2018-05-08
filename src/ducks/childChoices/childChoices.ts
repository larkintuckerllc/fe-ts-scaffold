import { List, Map } from 'immutable';
import AppAction from 'STORE/AppAction';
// import { AppStateRecord } from 'STORE/AppState';
import { ChildChoiceRecord } from './ChildChoice';

// STATE
export type ChildChoicesState = Map<number, List<ChildChoiceRecord>>;
export const childChoicesStateDefault = Map<number, List<ChildChoiceRecord>>();

// ACTIONS
const FETCH_CHILD_CHOICES_RESPONSE = 'FETCH_CHILD_CHOICES_RESPONSE';

export interface FetchChildChoicesResponseAction {
  type: typeof FETCH_CHILD_CHOICES_RESPONSE;
  payload: ChildChoicesState;
}

export const fetchChildChoicesResponse = (
  payload: Map<number, List<ChildChoiceRecord>>
): FetchChildChoicesResponseAction => ({
  payload,
  type: FETCH_CHILD_CHOICES_RESPONSE,
});

// REDUCER
export default (state: ChildChoicesState, action: AppAction) => {
  switch (action.type) {
    case FETCH_CHILD_CHOICES_RESPONSE:
      return action.payload;
    default:
      return state;
  }
};

/*
// SELECTORS
export const getParentChoicesRequested = (state: AppStateRecord) =>
  state.get('todos', null).get('requested', null);

export const getParentChoicesError = (state: AppStateRecord) =>
  state.get('todos', null).get('errored', null);

export const getParentChoices = (state: AppStateRecord) =>
  state.get('parentChoices', null).get('items', null);

*/
