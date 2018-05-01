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

const TodosStateFactory = Record<TodosState>(todosStateDefault);
export const todosStateRecordDefault = TodosStateFactory(todosStateDefault);
export type TodosStateRecord = Record<TodosState>;
