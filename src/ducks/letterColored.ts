import { Map } from 'immutable';
import AppAction from 'STORE/AppAction';
import { AppStateRecord } from 'STORE/AppState';

// ACTIONS
const LETTER_COLORED_TOGGLE = 'LETTER_COLORED_TOGGLE';

export interface LetterColoredToggleAction {
  type: typeof LETTER_COLORED_TOGGLE;
  payload: number;
}

export const letterColoredToggle = (id: number): LetterColoredToggleAction => ({
  payload: id,
  type: LETTER_COLORED_TOGGLE,
});

// STATE
export type LetterColoredToggleState = Map<number, boolean>;

export const letterColoredStateDefault = Map<number, boolean>();

// REDUCER
export default (state: Map<number, boolean>, action: AppAction) => {
  switch (action.type) {
    case LETTER_COLORED_TOGGLE:
      const id = action.payload;
      if (state.get(id, null) === null) {
        return state.set(id, true);
      }
      return state.remove(id);
    default:
      return state;
  }
};

// SELECTORS
export const getLetterColored = (state: AppStateRecord, id: number) => {
  return state.get('letterColored', null).get(id, null) !== null;
};
