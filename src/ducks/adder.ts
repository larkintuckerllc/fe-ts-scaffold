import { AppAction, AppState } from 'STORE/reducers';
import { List } from 'immutable';

const ADD = 'ADD';
export interface AddAction {
  type: 'ADD';
  payload: string;
}
export function add(value: string): AddAction {
  return ({
    type: ADD,
    payload: value,
  });
}
export default function adder(state = List<string>([]), action: AppAction) {
  switch (action.type) {
    case ADD:
      return state.push(action.payload);
    default:
      return state;
  }
}
export function getAdder(state: AppState) {
  return state.get('adder');
}
