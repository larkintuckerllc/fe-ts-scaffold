import { AppAction, State } from 'Store/reducers';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
export interface IncrementAction {
  type: 'INCREMENT';
}
export interface DecrementAction {
  type: 'DECREMENT';
}
export function increment() {
  return ({
    type: INCREMENT,
  });
}
export function decrement() {
  return ({
    type: DECREMENT,
  });
}
export default function counter(state = 0, action: AppAction) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
export function getCounter(state: State) {
  return state.counter;
}
