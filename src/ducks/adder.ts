import { ActionCreator } from 'redux';
import { AppAction, AppState } from 'STORE/reducers';
import { List } from 'immutable';

const ADD = 'ADD';
export interface AddAction {
  type: 'ADD';
  payload: string;
}
export const add: ActionCreator<AddAction> = (value: string) => ({
  type: ADD,
  payload: value,
});
export const adderDefault = List<string>([]);
export default (state: List<string>, action: AppAction) => {
  switch (action.type) {
    case ADD:
      return state.push(action.payload);
    default:
      return state;
  }
}
export const getAdder = (state: AppState) => {
  return state.get('adder');
};
