import { AddAction } from 'DUCKS/adder';
import { FetchChoicesRequestAction, FetchChoicesResponseAction } from 'DUCKS/choices';
import { DecrementAction, IncrementAction } from 'DUCKS/counter';
import { ToggleInfiniteAction } from 'DUCKS/infinite';
import {
  FetchItemsRequestAction,
  FetchItemsResponseAction,
  SetItemsCurrentPageAction,
} from 'DUCKS/items';
import { LetterColoredToggleAction } from 'DUCKS/letterColored';
import {
  FetchParentChoicesRequestAction,
  FetchParentChoicesResponseAction,
} from 'DUCKS/parentChoices';
import { FetchTodosRequestAction, FetchTodosResponseAction } from 'DUCKS/todos';

const UNKNOWN = 'UNKNOWN';

export interface UnknownAction {
  type: typeof UNKNOWN;
}

export const unknown = (): UnknownAction => ({
  type: UNKNOWN,
});

type AppAction =
  | AddAction
  | DecrementAction
  | FetchItemsRequestAction
  | FetchItemsResponseAction
  | FetchChoicesRequestAction
  | FetchChoicesResponseAction
  | FetchParentChoicesRequestAction
  | FetchParentChoicesResponseAction
  | FetchTodosRequestAction
  | FetchTodosResponseAction
  | IncrementAction
  | LetterColoredToggleAction
  | SetItemsCurrentPageAction
  | ToggleInfiniteAction
  | UnknownAction;

export default AppAction;
