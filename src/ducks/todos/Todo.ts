import { Record } from 'immutable';

export default interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const todoDefault: Todo = {
  completed: false,
  id: 0,
  title: 'title',
  userId: 0,
};

export const TodoFactory = Record(todoDefault);
export type TodoRecord = Record<Todo>;
