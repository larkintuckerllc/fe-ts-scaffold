import todos, {
  FetchTodosRequestAction as iFetchTodosRequestAction,
  FetchTodosResponseAction as iFetchTodosResponseAction,
  todosInitialState as iTodosInitialState,
 } from './todos';

export default todos;

export const todosInitialState = iTodosInitialState;

/* tslint:disable-next-line */
export interface FetchTodosRequestAction extends iFetchTodosRequestAction {};

/* tslint:disable-next-line */
export interface FetchTodosResponseAction extends iFetchTodosResponseAction {};