import Item from './Item';

describe('Item', () => {
  const itemDefault = {
    id: 0,
    name: 'name',
  };

  it('get id', () => {
    const item = new Item(itemDefault);
    const id = item.get('id');
    const result = 0;
    expect(id).toBe(result);
  });
});
