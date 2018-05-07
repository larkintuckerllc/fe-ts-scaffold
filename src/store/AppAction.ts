import { AddAction } from 'DUCKS/adder';
import { DecrementAction, IncrementAction } from 'DUCKS/counter';
import { ToggleInfiniteAction } from 'DUCKS/infinite';
import {
  FetchItemsRequestAction,
  FetchItemsResponseAction,
  SetItemsCurrentPageAction,
} from 'DUCKS/items';
import { LetterColoredToggleAction } from 'DUCKS/letterColored';
import { FetchListRequestAction, FetchListResponseAction } from 'DUCKS/list';
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
  | FetchListRequestAction
  | FetchListResponseAction
  | FetchTodosRequestAction
  | FetchTodosResponseAction
  | IncrementAction
  | LetterColoredToggleAction
  | SetItemsCurrentPageAction
  | ToggleInfiniteAction
  | UnknownAction;

export default AppAction;
