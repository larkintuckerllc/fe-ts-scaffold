import itemsAPI from './items';
import itemsTestData from './items.testdata';

const count = itemsTestData.length;
describe('items api', () => {
  it('fetchItems success with fetch success', async () => {
    const expectResponse = {
      count,
      results: itemsTestData,
    };
    expect.assertions(1);
    const response = await itemsAPI.fetch();
    expect(response).toEqual(expectResponse);
  });
  it('fetchItems success with fetch success with object', async () => {
    const expectResponse = {
      count,
      results: itemsTestData,
    };
    expect.assertions(1);
    const response = await itemsAPI.fetch({});
    expect(response).toEqual(expectResponse);
  });

  it('fetchItems success with fetch success with offset', async () => {
    const OFFSET = 1;
    const items = itemsTestData.slice(OFFSET);
    const expectResponse = {
      count,
      results: items,
    };
    expect.assertions(1);
    const response = await itemsAPI.fetch({ offset: OFFSET });
    expect(response).toEqual(expectResponse);
  });

  it('fetchItems success with fetch success with offset and limit', async () => {
    const OFFSET = 1;
    const LIMIT = 2;
    const items = itemsTestData.slice(OFFSET, OFFSET + LIMIT);
    const expectResponse = {
      count,
      results: items,
    };
    expect.assertions(1);
    const response = await itemsAPI.fetch({ offset: OFFSET, limit: LIMIT });
    expect(response).toEqual(expectResponse);
  });
});
