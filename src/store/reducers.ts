import { combineReducers } from 'redux';
import counter, { IncrementAction, DecrementAction } from 'Ducks/counter';

export type AppAction =
  IncrementAction |
  DecrementAction;
export interface State {
  counter: number;
}
const reducers = {
  counter,
};
export default combineReducers(reducers);
