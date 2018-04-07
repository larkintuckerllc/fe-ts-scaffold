import { AddAction } from 'DUCKS/adder';
import { DecrementAction, IncrementAction } from 'DUCKS/counter';
import {
  FetchTodosRequestAction,
  FetchTodosResponseAction,
} from 'DUCKS/todos';

type AppAction =
  AddAction |
  DecrementAction |
  FetchTodosRequestAction |
  FetchTodosResponseAction |
  IncrementAction;

export default AppAction;
