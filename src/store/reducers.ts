import adder from 'DUCKS/adder';
import childChoices from 'DUCKS/childChoices';
import choices from 'DUCKS/choices';
import counter from 'DUCKS/counter';
import infinite from 'DUCKS/infinite';
import items from 'DUCKS/items';
import letterColored from 'DUCKS/letterColored';
import parentChoices from 'DUCKS/parentChoices';
import todos from 'DUCKS/todos';
import { combineReducers } from 'redux-immutable';

const reducers = {
  adder,
  childChoices,
  choicesA: choices('choicesA'),
  choicesB: choices('choicesB'),
  counter,
  infinite,
  items,
  letterColored,
  parentChoices,
  todos,
};

export default combineReducers(reducers);
