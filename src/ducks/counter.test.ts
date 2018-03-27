import { init } from 'STORE/reducers';
import counter, { decrement, increment } from './counter';

describe('first reducer', () => {
  it('should return the initial state', () => {
    expect(counter(undefined, init())).toBe(0);
  });
  it('should handle INCREMENT', () => {
    expect(counter(undefined, increment())).toBe(1);
  });
  it('should handle DECREMENT', () => {
    expect(counter(undefined, decrement())).toBe(-1);
  });
});