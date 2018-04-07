import * as fromTodos from 'DUCKS/todos';
import Todo from 'DUCKS/todos/Todo';
import { List } from 'immutable';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppState from 'STORE/AppState';
import Todos from './Todos';

interface StateProps {
  error: boolean;
  requested: boolean;
  todos: List<Todo>;
}

interface DispatchProps {
  fetchTodos(): void;
}

interface AsyncProps extends StateProps, DispatchProps {
}

export class Async extends Component<AsyncProps> {

  public componentDidMount() {
    const { fetchTodos } = this.props;
    fetchTodos();
  }

  public render() {
    const { error, requested, todos } = this.props;
    if (requested) { return <div>Requested</div>; }
    if (error) { return <div>Error</div>; }
    return (
      <div>
        <h2>Async</h2>
        <Todos todos={todos.toJS()} />
      </div>
    );
  }

}
const mapStateToProps = (state: AppState) => {
  return ({
    error: fromTodos.getTodosError(state),
    requested: fromTodos.getTodosRequested(state),
    todos: fromTodos.getTodos(state),
  });
};

const mapDispatchToProps = {
  fetchTodos: fromTodos.fetchTodos,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Async);
