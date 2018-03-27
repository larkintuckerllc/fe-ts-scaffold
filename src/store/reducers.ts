import { combineReducers } from 'redux-immutable';
import { Collection } from 'immutable';
import counter, { IncrementAction, DecrementAction } from 'DUCKS/counter';
import adder, { AddAction } from 'DUCKS/adder';

interface InitAction {
  type: '@@INIT';
}
export function init(): InitAction {
  return ({
    type: '@@INIT',
  });
}
export type AppAction =
  AddAction |
  IncrementAction |
  InitAction |
  DecrementAction;
export type AppState = Collection<string, any>;
const reducers = {
  adder,
  counter,
};
export default combineReducers(reducers);
