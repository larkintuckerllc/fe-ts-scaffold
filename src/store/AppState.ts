import { AdderState, adderStateDefault } from 'DUCKS/adder';
import { ChoicesStateRecord, choicesStateRecordDefault } from 'DUCKS/choices/ChoicesState';
import { CounterState, counterStateDefault } from 'DUCKS/counter';
import { InfiniteState, infiniteStateDefault } from 'DUCKS/infinite';
import { ItemsStateRecord, itemsStateRecordDefault } from 'DUCKS/items/ItemsState';
import { letterColoredStateDefault, LetterColoredToggleState } from 'DUCKS/letterColored';
import { TodosStateRecord, todosStateRecordDefault } from 'DUCKS/todos/TodosState';
import { Record } from 'immutable';

export default interface AppState {
  adder: AdderState;
  choices: ChoicesStateRecord;
  counter: CounterState;
  infinite: InfiniteState;
  items: ItemsStateRecord;
  letterColored: LetterColoredToggleState;
  todos: TodosStateRecord;
}

const appStateDefault: AppState = {
  adder: adderStateDefault,
  choices: choicesStateRecordDefault,
  counter: counterStateDefault,
  infinite: infiniteStateDefault,
  items: itemsStateRecordDefault,
  letterColored: letterColoredStateDefault,
  todos: todosStateRecordDefault,
};

const AppStateFactory = Record<AppState>(appStateDefault);
export const appStateRecordDefault = AppStateFactory(appStateDefault);
export type AppStateRecord = Record<AppState>;
