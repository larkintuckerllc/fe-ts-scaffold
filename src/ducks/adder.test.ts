import { init } from 'STORE/reducers';
import { List, Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import adder, { add, getAdder } from './adder';

describe('adder duck', () => {
  beforeEach(function () {
    jest.addMatchers(matchers);
  });
  it('reducer should return the initial state', () => {
    expect(adder(undefined, init())).toEqualImmutable(List<string>([]));
  });
  it('reducer should handle ADD', () => {
    expect(adder(undefined, add('Test'))).toEqualImmutable(List<string>(['Test']));
  });
  it('add should create ADD action', () => {
    expect(add('Test')).toEqual({
      type: 'ADD',
      payload: 'Test',
  })});
  it('getAdder should return', () => {
    expect(getAdder(Map({ adder: true }))).toEqual(true);
  });
});