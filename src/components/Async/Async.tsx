import { List } from 'immutable';
/* tslint:disable-next-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fromTodos from 'DUCKS/todos';
import { AppState } from 'STORE/reducers';
import Todos from './Todos';

interface StateProps {
  error: boolean;
  requested: boolean;
  todos: List<fromTodos.Todo>;
}
interface DispatchProps {
  fetchTodos(): void;
}
interface ConnectedProps extends StateProps, DispatchProps {
}
export class Connected extends Component<ConnectedProps> {
  componentDidMount() {
    const { fetchTodos } = this.props;
    fetchTodos();
  }
  render() {
    const { error, requested, todos } = this.props;
    if (requested) return <div>Requested</div>;
    if (error) return <div>Error</div>;
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
)(Connected);

