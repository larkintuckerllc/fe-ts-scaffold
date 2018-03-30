/* tslint:disable-next-line */
import React from 'react';
import { TodoParams } from 'DUCKS/todos';

interface TodosProps {
  todos: TodoParams[];
}
export default ({ todos }: TodosProps) => {
  return (
      <ul>
        { todos.map(o => <li>{o.id}</li>)}
      </ul>
  );
};
