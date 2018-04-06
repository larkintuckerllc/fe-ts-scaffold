import adder, { AddAction, adderInitialState } from 'DUCKS/adder';
import counter, { counterInitialState, DecrementAction, IncrementAction } from 'DUCKS/counter';
import todos, {
  FetchTodosRequestAction,
  FetchTodosResponseAction,
  todosInitialState,
} from 'DUCKS/todos';
import TodosState from 'DUCKS/todos/TodosState';
import { List, Record } from 'immutable';
import { combineReducers } from 'redux-immutable';

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
  public get<T extends keyof AppStateJS>(value: T): AppStateJS[T] {
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
