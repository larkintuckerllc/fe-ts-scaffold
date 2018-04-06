import { List, Map, Record } from 'immutable';
import Todo from './Todo';

export const todosDefault = {
  byId: Map<number, Todo>({}),
  errored: false,
  ids: List<number>([]),
  requested: false,
};
interface TodosStateJS {
  byId: Map<number, Todo>;
  errored: boolean;
  ids: List<number>;
  requested: boolean;
}
export default class TodosState extends Record(todosDefault) {
  constructor(params: TodosStateJS) {
    super(params);
  }
  public get<T extends keyof TodosStateJS>(value: T): TodosStateJS[T] { 
    return super.get(value);
  }
}
