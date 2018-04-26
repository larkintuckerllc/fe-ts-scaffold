import adder from 'DUCKS/adder';
import counter from 'DUCKS/counter';
import infinite from 'DUCKS/infinite';
import items from 'DUCKS/items';
import todos from 'DUCKS/todos';
import { combineReducers } from 'redux-immutable';

const reducers = {
  adder,
  counter,
  infinite,
  items,
  todos,
};

export default combineReducers(reducers);
