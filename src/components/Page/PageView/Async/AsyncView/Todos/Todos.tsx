import { TodoJS } from 'DUCKS/todos/Todo';
import React from 'react';

interface TodosProps {
  todos: TodoJS[];
}
export default ({ todos }: TodosProps) => {
  return <ul>{todos.map(o => <li key={o.id}>{o.title}</li>)}</ul>;
};
