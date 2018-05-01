import { appStateInitial } from './AppState';

describe('AppState', () => {
  it('get counter', () => {
    const counter = appStateInitial.get('counter', null);
    expect(counter).toBe(0);
  });
});
