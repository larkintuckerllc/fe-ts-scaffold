import { adderInitialState } from 'DUCKS/adder';
import { counterInitialState } from 'DUCKS/counter';
import TodosState, { todosInitialState } from 'DUCKS/todos/TodosState';
import { List, Record } from 'immutable';

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

export default class AppState extends Record(appStateDefault) {
  constructor(params: AppStateJS) {
    super(params);
  }
  public get<T extends keyof AppStateJS>(value: T): AppStateJS[T] {
    return super.get(value);
  }
}

export const appStateInitial = new AppState(appStateDefault);
