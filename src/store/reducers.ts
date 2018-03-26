import { combineReducers } from 'redux';
import counter, { IncrementAction, DecrementAction } from 'Ducks/counter';
import adder, { AddAction } from 'Ducks/adder';

export type AppAction =
  AddAction |
  IncrementAction |
  DecrementAction;
export interface State {
  adder: string[];
  counter: number;
}
const reducers = {
  adder,
  counter,
};
export default combineReducers(reducers);
