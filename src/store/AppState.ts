import { adderInitialState, AdderState } from 'DUCKS/adder';
import { counterInitialState, CounterState } from 'DUCKS/counter';
import { infiniteInitialState, InfiniteState } from 'DUCKS/infinite';
import { itemsInitialState, ItemsStateRecord } from 'DUCKS/items/ItemsState';
import { todosInitialState, TodosStateRecord } from 'DUCKS/todos/TodosState';
import { Record } from 'immutable';

export default interface AppState {
  adder: AdderState;
  counter: CounterState;
  infinite: InfiniteState;
  items: ItemsStateRecord;
  todos: TodosStateRecord;
}

const appStateDefault: AppState = {
  adder: adderInitialState,
  counter: counterInitialState,
  infinite: infiniteInitialState,
  items: itemsInitialState,
  todos: todosInitialState,
};

export const appStateInitial = Record<AppState>(appStateDefault)(appStateDefault);
export type AppStateRecord = Record<AppState>;
