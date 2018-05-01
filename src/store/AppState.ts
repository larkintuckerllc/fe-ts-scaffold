import { adderInitialState, AdderState } from 'DUCKS/adder';
import { counterInitialState, CounterState } from 'DUCKS/counter';
import { infiniteInitialState, InfiniteState } from 'DUCKS/infinite';
import ItemsState, { itemsInitialState } from 'DUCKS/items/ItemsState';
import TodosState, { todosInitialState } from 'DUCKS/todos/TodosState';
import { Record } from 'immutable';

export default interface AppState {
  adder: AdderState;
  counter: CounterState;
  infinite: InfiniteState;
  items: Record<ItemsState>;
  todos: Record<TodosState>;
}

const appStateDefault: AppState = {
  adder: adderInitialState,
  counter: counterInitialState,
  infinite: infiniteInitialState,
  items: itemsInitialState,
  todos: todosInitialState,
};

export const appStateInitial = Record(appStateDefault)(appStateDefault);
