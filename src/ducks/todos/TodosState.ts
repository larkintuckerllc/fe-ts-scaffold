import { List, Map, Record } from 'immutable';
import { TodoRecord } from './Todo';

export default interface TodosState {
  byId: Map<number, TodoRecord>;
  errored: boolean;
  ids: List<number>;
  requested: boolean;
}

const todosStateDefault: TodosState = {
  byId: Map<number, TodoRecord>(),
  errored: false,
  ids: List<number>([]),
  requested: false,
};

export const todosInitialState = Record<TodosState>(todosStateDefault)(todosStateDefault);
export type TodosStateRecord = Record<TodosState>;
