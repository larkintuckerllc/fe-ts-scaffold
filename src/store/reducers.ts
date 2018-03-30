import { combineReducers } from 'redux-immutable';
import { List, Record } from 'immutable';
import counter, { counterInitialState, IncrementAction, DecrementAction } from 'DUCKS/counter';
import adder, { adderInitialState, AddAction } from 'DUCKS/adder';
import todos, {
  FetchTodosRequestAction,
  FetchTodosResponseAction,
  todosInitialState,
  TodosState,
} from 'DUCKS/todos';

// ACTIONS
interface InitAction {
  type: '@@INIT';
}
export const init = (): InitAction => ({
  type: '@@INIT',
});
export type AppAction =
  AddAction |
  DecrementAction |
  FetchTodosRequestAction |
  FetchTodosResponseAction |
  IncrementAction |
  InitAction;
// STATE
const appStateDefault = {
  adder: adderInitialState,
  counter: counterInitialState,
  todos: todosInitialState,
};
interface AppStateJS {
  adder: List<string>;
  counter: number;
  todos: TodosState;
}
export class AppState extends Record(appStateDefault) {
  constructor(params: AppStateJS) {
    super(params);
  }
  get<T extends keyof AppStateJS>(value: T): AppStateJS[T] { 
    return super.get(value);
  }
}
export const initialState = new AppState(appStateDefault);
// REDUCERS
const reducers = {
  adder,
  counter,
  todos,
};
export default combineReducers(reducers);
