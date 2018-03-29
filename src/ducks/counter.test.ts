import { init, initialState } from 'STORE/reducers';
import counter, { decrement, getCounter, increment } from './counter';

describe('counter duck', () => {
  it('reducer should ignore unknown actions', () => {
    expect(counter(0, init())).toBe(0);
  });
  it('reducer should handle INCREMENT', () => {
    expect(counter(0, increment())).toBe(1);
  });
  it('reducer should handle DECREMENT', () => {
    expect(counter(0, decrement())).toBe(-1);
  });
  it('add should create INCREMENT action', () => {
    expect(increment()).toEqual({
      type: 'INCREMENT',
    });
  });
  it('add should create DECREMENT action', () => {
    expect(decrement()).toEqual({
      type: 'DECREMENT',
    });
  });
  it('getCounter should return', () => {
    expect(getCounter(initialState)).toEqual(0);
  });
});
