import { adderInitialState, AdderState } from 'DUCKS/adder';
import { counterInitialState, CounterState } from 'DUCKS/counter';
import { infiniteInitialState, InfiniteState } from 'DUCKS/infinite';
import ItemsState, { itemsInitialState } from 'DUCKS/items/ItemsState';
import TodosState, { todosInitialState } from 'DUCKS/todos/TodosState';
import { Record } from 'immutable';

const appStateDefault = {
  adder: adderInitialState,
  counter: counterInitialState,
  infinite: infiniteInitialState,
  items: itemsInitialState,
  todos: todosInitialState,
};

interface AppStateJS {
  adder: AdderState;
  counter: CounterState;
  infinite: InfiniteState;
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
