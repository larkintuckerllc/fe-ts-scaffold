import { AdderState, adderStateDefault } from 'DUCKS/adder';
import { ChildChoicesState, childChoicesStateDefault } from 'DUCKS/childChoices';
import { ChoicesStateRecord, choicesStateRecordDefault } from 'DUCKS/choices/ChoicesState';
import { CounterState, counterStateDefault } from 'DUCKS/counter';
import { InfiniteState, infiniteStateDefault } from 'DUCKS/infinite';
import { ItemsStateRecord, itemsStateRecordDefault } from 'DUCKS/items/ItemsState';
import { letterColoredStateDefault, LetterColoredToggleState } from 'DUCKS/letterColored';
import {
  ParentChoicesStateRecord,
  parentChoicesStateRecordDefault,
} from 'DUCKS/parentChoices/ParentChoicesState';
import { TodosStateRecord, todosStateRecordDefault } from 'DUCKS/todos/TodosState';
import { Record } from 'immutable';

export default interface AppState {
  adder: AdderState;
  childChoices: ChildChoicesState;
  choicesA: ChoicesStateRecord;
  choicesB: ChoicesStateRecord;
  counter: CounterState;
  infinite: InfiniteState;
  items: ItemsStateRecord;
  letterColored: LetterColoredToggleState;
  parentChoices: ParentChoicesStateRecord;
  todos: TodosStateRecord;
}

const appStateDefault: AppState = {
  adder: adderStateDefault,
  childChoices: childChoicesStateDefault,
  choicesA: choicesStateRecordDefault,
  choicesB: choicesStateRecordDefault,
  counter: counterStateDefault,
  infinite: infiniteStateDefault,
  items: itemsStateRecordDefault,
  letterColored: letterColoredStateDefault,
  parentChoices: parentChoicesStateRecordDefault,
  todos: todosStateRecordDefault,
};

const AppStateFactory = Record<AppState>(appStateDefault);
export const appStateRecordDefault = AppStateFactory(appStateDefault);
export type AppStateRecord = Record<AppState>;
