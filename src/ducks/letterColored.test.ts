import { Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { unknown } from 'STORE/AppAction';
import { appStateRecordDefault } from 'STORE/AppState';
// import counter, { decrement, getCounter, increment } from './counter';
import letterColored, { getLetterColored, letterColoredToggle } from './letterColored';

beforeEach(() => {
  jest.addMatchers(matchers);
  jest.resetModules();
  jest.resetAllMocks();
});

describe('letterColored duck', () => {
  it('reducer should ignore unknown actions', () => {
    const initialState = Map<number, boolean>();
    const action = unknown();
    expect(letterColored(initialState, action)).toBe(initialState);
  });

  it('reducer should handle LETTER_COLORED_TOGGLE adding', () => {
    const initialState = Map<number, boolean>();
    const nextState: Map<number, boolean> = Map.of(0, true);
    const action = letterColoredToggle(0);
    expect(letterColored(initialState, action)).toEqualImmutable(nextState);
  });

  it('reducer should handle LETTER_COLORED_TOGGLE removing', () => {
    const initialState: Map<number, boolean> = Map.of(0, true);
    const nextState = Map<number, boolean>();
    const action = letterColoredToggle(0);
    expect(letterColored(initialState, action)).toEqualImmutable(nextState);
  });

  it('add should create LETTER_COLORED_TOGGLE action', () => {
    const result = {
      payload: 0,
      type: 'LETTER_COLORED_TOGGLE',
    };
    expect(letterColoredToggle(0)).toEqual(result);
  });

  it('getLetterColored should return', () => {
    const result = false;
    expect(getLetterColored(appStateRecordDefault, 0)).toEqual(result);
  });
});
