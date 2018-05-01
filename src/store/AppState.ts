import { AdderState, adderStateDefault } from 'DUCKS/adder';
import { CounterState, counterStateDefault } from 'DUCKS/counter';
import { InfiniteState, infiniteStateDefault } from 'DUCKS/infinite';
import { ItemsStateRecord, itemsStateRecordDefault } from 'DUCKS/items/ItemsState';
import { TodosStateRecord, todosStateRecordDefault } from 'DUCKS/todos/TodosState';
import { Record } from 'immutable';

export default interface AppState {
  adder: AdderState;
  counter: CounterState;
  infinite: InfiniteState;
  items: ItemsStateRecord;
  todos: TodosStateRecord;
}

const appStateDefault: AppState = {
  adder: adderStateDefault,
  counter: counterStateDefault,
  infinite: infiniteStateDefault,
  items: itemsStateRecordDefault,
  todos: todosStateRecordDefault,
};

const AppStateFactory = Record<AppState>(appStateDefault);
export const appStateRecordDefault = AppStateFactory(appStateDefault);
export type AppStateRecord = Record<AppState>;
