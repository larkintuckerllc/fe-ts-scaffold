import { combineReducers } from 'redux-immutable';
import { Collection } from 'immutable';
import counter, { IncrementAction, DecrementAction } from 'DUCKS/counter';
import adder, { AddAction } from 'DUCKS/adder';

export type AppAction =
  AddAction |
  IncrementAction |
  DecrementAction;
export type AppState = Collection<string, any>;
const reducers = {
  adder,
  counter,
};
export default combineReducers(reducers);
