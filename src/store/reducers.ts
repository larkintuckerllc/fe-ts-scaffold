import { combineReducers } from 'redux-immutable';
import { List, Record } from 'immutable';
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
const appStateDefaults = {
  adder: List<string>([]),
  counter: 0,
};
interface AppStateParams {
  adder: List<string>;
  counter: number;
}
export class AppState extends Record(appStateDefaults) {
  constructor(params: AppStateParams) {
    super(params);
  }
  get<T extends keyof AppStateParams>(value: T): AppStateParams[T] { 
    return super.get(value);
  }
}
export const initialState = new AppState(appStateDefaults);
const reducers = {
  adder,
  counter,
};
export default combineReducers(reducers);
