import { AddAction } from 'DUCKS/adder';
import { DecrementAction, IncrementAction } from 'DUCKS/counter';
import {
  FetchTodosRequestAction,
  FetchTodosResponseAction,
} from 'DUCKS/todos';

interface InitAction {
  type: '@@INIT';
}

export const init = (): InitAction => ({
  type: '@@INIT',
});

type AppAction =
  AddAction |
  DecrementAction |
  FetchTodosRequestAction |
  FetchTodosResponseAction |
  IncrementAction |
  InitAction;

export default AppAction;
