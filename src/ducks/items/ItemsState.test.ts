import { itemsInitialState } from './ItemsState';

describe('ItemsState', () => {
  it('get errored', () => {
    const errored = itemsInitialState.get('errored');
    expect(errored).toBe(false);
  });
});
