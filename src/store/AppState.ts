import { adderInitialState, AdderState } from 'DUCKS/adder';
import { counterInitialState, CounterState } from 'DUCKS/counter';
import ItemsState, { itemsInitialState } from 'DUCKS/items/ItemsState';
import TodosState, { todosInitialState } from 'DUCKS/todos/TodosState';
import { Record } from 'immutable';

const appStateDefault = {
  adder: adderInitialState,
  counter: counterInitialState,
  items: itemsInitialState,
  todos: todosInitialState,
};

interface AppStateJS {
  adder: AdderState;
  counter: CounterState;
  items: ItemsState;
  todos: TodosState;
}

export default class AppState extends Record(appStateDefault) {
  constructor(params: AppStateJS) {
    super(params);
  }
  public get<T extends keyof AppStateJS>(value: T): AppStateJS[T] {
    return super.get(value, null);
  }
}

export const appStateInitial = new AppState(appStateDefault);
