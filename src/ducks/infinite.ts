import AppAction from 'STORE/AppAction';
import { AppStateRecord } from 'STORE/AppState';

// ACTIONS
const TOGGLE_INFINITE = 'TOGGLE_INFINITE';

export interface ToggleInfiniteAction {
  type: typeof TOGGLE_INFINITE;
}

export const toggleInfinite = (): ToggleInfiniteAction => ({
  type: TOGGLE_INFINITE,
});

// STATE
export type InfiniteState = boolean;

export const infiniteStateDefault = false;

// REDUCER
export default (state: boolean, action: AppAction) => {
  switch (action.type) {
    case TOGGLE_INFINITE:
      return !state;
    default:
      return state;
  }
};

// SELECTORS
export const getInfinite = (state: AppStateRecord) => {
  return state.get('infinite', null);
};
