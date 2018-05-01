import * as fromTodos from 'DUCKS/todos';
import Todo from 'DUCKS/todos/Todo';
import { List, Record } from 'immutable';
import { connect } from 'react-redux';
import AppState from 'STORE/AppState';
import AsyncView from './AsyncView';

interface StateProps {
  error: boolean;
  requested: boolean;
  todos: List<Record<Todo>>;
}

interface DispatchProps {
  fetchTodos(): void;
}

const mapStateToProps = (state: Record<AppState>) => ({
  error: fromTodos.getTodosError(state),
  requested: fromTodos.getTodosRequested(state),
  todos: fromTodos.getTodos(state),
});

const mapDispatchToProps = {
  fetchTodos: fromTodos.fetchTodos,
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(AsyncView);
