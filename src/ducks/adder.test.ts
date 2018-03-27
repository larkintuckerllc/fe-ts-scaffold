import { init } from 'STORE/reducers';
import { List } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import adder, { add } from './adder';

describe('first reducer', () => {
  beforeEach(function () {
    jest.addMatchers(matchers);
  });
  it('should return the initial state', () => {
    expect(adder(undefined, init())).toEqualImmutable(List<string>([]));
  });
  it('should handle ADD', () => {
    expect(adder(undefined, add('Test'))).toEqualImmutable(List<string>(['Test']));
  });
});