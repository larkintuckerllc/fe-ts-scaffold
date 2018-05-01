import { unknown } from 'STORE/AppAction';
import { appStateRecordDefault } from 'STORE/AppState';
import infinite, { getInfinite, toggleInfinite } from './infinite';

describe('counter duck', () => {
  it('reducer should ignore unknown actions', () => {
    const initialState = false;
    const action = unknown();
    expect(infinite(initialState, action)).toBe(initialState);
  });

  it('reducer should handle TOGGLE_INFINITE', () => {
    const initialState = false;
    const nextState = true;
    const action = toggleInfinite();
    expect(infinite(initialState, action)).toBe(nextState);
  });

  it('toggleInfinite should create TOGGLE_INFINITE action', () => {
    const result = {
      type: 'TOGGLE_INFINITE',
    };
    expect(toggleInfinite()).toEqual(result);
  });

  it('getInfinite should return', () => {
    const result = false;
    expect(getInfinite(appStateRecordDefault)).toEqual(result);
  });
});
