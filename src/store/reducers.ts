import { combineReducers } from 'redux-immutable';
import { List, Record } from 'immutable';
import counter, { counterDefault, IncrementAction, DecrementAction } from 'DUCKS/counter';
import adder, { adderDefault, AddAction } from 'DUCKS/adder';

// ACTIONS
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
// STATE
const appStateDefaults = {
  adder: adderDefault,
  counter: counterDefault,
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
// REDUCERS
const reducers = {
  adder,
  counter,
};
export default combineReducers(reducers);
