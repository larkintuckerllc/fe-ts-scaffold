import { AppAction, AppState } from 'STORE/reducers';
import { List } from 'immutable';

// ACTIONS
const ADD = 'ADD';
export interface AddAction {
  type: 'ADD';
  payload: string;
}
export const add = (value: string): AddAction => ({
  type: ADD,
  payload: value,
});
// STATE
export const adderInitialState = List<string>([]);
// REDUCER
export default (state: List<string>, action: AppAction) => {
  switch (action.type) {
    case ADD:
      return state.push(action.payload);
    default:
      return state;
  }
};
// SELECTORS
export const getAdder = (state: AppState) => {
  return state.get('adder');
};
