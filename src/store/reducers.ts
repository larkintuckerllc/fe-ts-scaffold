import adder from 'DUCKS/adder';
import choices from 'DUCKS/choices';
import counter from 'DUCKS/counter';
import infinite from 'DUCKS/infinite';
import items from 'DUCKS/items';
import letterColored from 'DUCKS/letterColored';
import todos from 'DUCKS/todos';
import { combineReducers } from 'redux-immutable';

const reducers = {
  adder,
  choices,
  counter,
  infinite,
  items,
  letterColored,
  todos,
};

export default combineReducers(reducers);
