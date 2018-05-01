import { fetchItems } from './items';

const ITEMS = [
  {
    id: 0,
    name: 'A',
  },
  {
    id: 1,
    name: 'B',
  },
  {
    id: 2,
    name: 'C',
  },
  {
    id: 3,
    name: 'D',
  },
  {
    id: 4,
    name: 'E',
  },
];
const count = ITEMS.length;
describe('items api', () => {
  it('fetchItems success with fetch success', async () => {
    const expectResponse = {
      count,
      results: ITEMS,
    };
    expect.assertions(1);
    const response = await fetchItems();
    expect(response).toEqual(expectResponse);
  });

  it('fetchItems success with fetch success with object', async () => {
    const expectResponse = {
      count,
      results: ITEMS,
    };
    expect.assertions(1);
    const response = await fetchItems({});
    expect(response).toEqual(expectResponse);
  });

  it('fetchItems success with fetch success with offset', async () => {
    const OFFSET = 1;
    const items = ITEMS.slice(OFFSET);
    const expectResponse = {
      count,
      results: items,
    };
    expect.assertions(1);
    const response = await fetchItems({ offset: OFFSET });
    expect(response).toEqual(expectResponse);
  });

  it('fetchItems success with fetch success with offset and limit', async () => {
    const OFFSET = 1;
    const LIMIT = 2;
    const items = ITEMS.slice(OFFSET, OFFSET + LIMIT);
    const expectResponse = {
      count,
      results: items,
    };
    expect.assertions(1);
    const response = await fetchItems({ offset: OFFSET, limit: LIMIT });
    expect(response).toEqual(expectResponse);
  });
});
