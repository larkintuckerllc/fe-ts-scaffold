/* tslint:disable-next-line */
import React from 'react';
import { TodoJS } from 'DUCKS/todos';

interface TodosProps {
  todos: TodoJS[];
}
export default ({ todos }: TodosProps) => {
  return (
      <ul>
        { todos.map(o => <li>{o.id}</li>)}
      </ul>
  );
};
