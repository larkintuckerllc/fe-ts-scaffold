import adder, { AddAction } from 'DUCKS/adder';
import counter, { DecrementAction, IncrementAction } from 'DUCKS/counter';
import todos, {
  FetchTodosRequestAction,
  FetchTodosResponseAction,
} from 'DUCKS/todos';
import { combineReducers } from 'redux-immutable';

// ACTIONS
interface InitAction {
  type: '@@INIT';
}

export const init = (): InitAction => ({
  type: '@@INIT',
});

export type AppAction =
  AddAction |
  DecrementAction |
  FetchTodosRequestAction |
  FetchTodosResponseAction |
  IncrementAction |
  InitAction;

const reducers = {
  adder,
  counter,
  todos,
};

export default combineReducers(reducers);
