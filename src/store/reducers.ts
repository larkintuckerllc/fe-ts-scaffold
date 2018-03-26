import { combineReducers } from 'redux-immutable';
import { Map, Collection, List } from 'immutable';
import counter, { IncrementAction, DecrementAction } from 'Ducks/counter';
import adder, { AddAction } from 'Ducks/adder';

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
