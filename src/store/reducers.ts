import { combineReducers } from 'redux-immutable';
import { List, Record } from 'immutable';
import counter, { counterDefault, IncrementAction, DecrementAction } from 'DUCKS/counter';
import adder, { adderDefault, AddAction } from 'DUCKS/adder';
import my, { myInitialState, myState } from 'DUCKS/my';

// ACTIONS
interface InitAction {
  type: '@@INIT';
}
export const init = (): InitAction => ({
  type: '@@INIT',
});
export type AppAction =
  AddAction |
  IncrementAction |
  InitAction |
  DecrementAction;
// STATE
const appStateDefaults = {
  adder: adderDefault,
  counter: counterDefault,
  my: myInitialState,
};
interface AppStateParams {
  adder: List<string>;
  counter: number;
  my: myState;
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
  my,
};
export default combineReducers(reducers);
