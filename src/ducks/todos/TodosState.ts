import { List, Map, Record } from 'immutable';
import Todo from './Todo';

export default interface TodosState {
  byId: Map<number, Record<Todo>>;
  errored: boolean;
  ids: List<number>;
  requested: boolean;
}

const todosStateDefault: TodosState = {
  byId: Map<number, Record<Todo>>(),
  errored: false,
  ids: List<number>([]),
  requested: false,
};

export const todosInitialState = Record<TodosState>(todosStateDefault)(todosStateDefault);
