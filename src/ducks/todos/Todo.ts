import { Record } from 'immutable';

export default interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userID: number;
}

const todoDefault: Todo = {
  completed: false,
  id: 0,
  title: 'title',
  userID: 0,
};

export const TodoFactory = Record(todoDefault);
