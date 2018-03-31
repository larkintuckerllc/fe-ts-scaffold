/* tslint:disable-next-line */
import React from 'react';
import { TodoJS } from 'DUCKS/todos';

interface TodosProps {
  todos: TodoJS[];
}
export default ({ todos }: TodosProps) => {
  return (
      <ul>
        { todos.map(o => <li key={o.id}>{o.title}</li>)}
      </ul>
  );
};
