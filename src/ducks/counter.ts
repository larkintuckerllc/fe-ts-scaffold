import { AppAction, AppState } from 'STORE/reducers';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
export interface IncrementAction {
  type: 'INCREMENT';
}
export interface DecrementAction {
  type: 'DECREMENT';
}
export function increment(): IncrementAction {
  return ({
    type: INCREMENT,
  });
}
export function decrement(): DecrementAction {
  return ({
    type: DECREMENT,
  });
}
export const counterDefault = 0;
export default function counter(state: number, action: AppAction) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
export function getCounter(state: AppState) {
  return state.get('counter');
}
