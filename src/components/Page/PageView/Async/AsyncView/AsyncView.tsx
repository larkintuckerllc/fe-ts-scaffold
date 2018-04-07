import Todo from 'DUCKS/todos/Todo';
import { List } from 'immutable';
import React, { Component } from 'react';
import Todos from './Todos';

interface AsyncViewProps {
  error: boolean;
  requested: boolean;
  todos: List<Todo>;
  fetchTodos(): void;
}

export default class AsyncView extends Component<AsyncViewProps> {
  public componentDidMount() {
    const { fetchTodos } = this.props;
    fetchTodos();
  }
  public render() {
    const { error, requested, todos } = this.props;
    if (requested) {
      return <div>Requested</div>;
    }
    if (error) {
      return <div>Error</div>;
    }
    return (
      <div>
        <h2>Async</h2>
        <Todos todos={todos.toJS()} />
      </div>
    );
  }
}
