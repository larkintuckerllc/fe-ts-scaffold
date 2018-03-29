import { ActionCreator } from 'redux';
import { combineReducers } from 'redux-immutable';
import { List, Record } from 'immutable';
import counter, { counterDefault, IncrementAction, DecrementAction } from 'DUCKS/counter';
import adder, { adderDefault, AddAction } from 'DUCKS/adder';
import ids, { idsDefault, FetchTodosRequestAction, FetchTodosResponseAction } from 'DUCKS/ids';

// ACTIONS
interface InitAction {
  type: '@@INIT';
}
export const init: ActionCreator<InitAction> = () => ({
  type: '@@INIT',
});
export type AppAction =
  AddAction |
  IncrementAction |
  InitAction |
  DecrementAction |
  FetchTodosRequestAction |
  FetchTodosResponseAction;
// STATE
const appStateDefaults = {
  adder: adderDefault,
  counter: counterDefault,
  ids: idsDefault,
};
interface AppStateParams {
  adder: List<string>;
  counter: number;
  ids: List<number>;
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
  ids,
};
export default combineReducers(reducers);
