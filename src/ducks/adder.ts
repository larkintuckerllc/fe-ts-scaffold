import { AppAction, State } from 'Store/reducers';

const ADD = 'ADD';
export interface AddAction {
  type: 'ADD';
  payload: string;
}
export function add(value: string) {
  return ({
    type: ADD,
    payload: value,
  });
}
export default function adder(state: string[] = [], action: AppAction) {
  switch (action.type) {
    case ADD:
      return [...state, action.payload];
    default:
      return state;
  }
}
export function getAdder(state: State) {
  return state.adder;
}
