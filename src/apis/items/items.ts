import itemsTestData from './items.testdata';
interface FetchItemsParams {
  limit?: number;
  offset?: number;
}
const fetchItems = (params?: FetchItemsParams) => {
  let items;
  let response;
  if (params === undefined) {
    response = {
      count: itemsTestData.length,
      results: itemsTestData,
    };
    return Promise.resolve(response);
  }
  const limit = params.limit;
  const offset = params.offset !== undefined ? params.offset : 0;
  if (limit === undefined) {
    items = itemsTestData.slice(offset);
    response = {
      count: itemsTestData.length,
      results: items,
    };
    return Promise.resolve(response);
  }
  items = itemsTestData.slice(offset, offset + limit);
  response = {
    count: itemsTestData.length,
    results: items,
  };
  return Promise.resolve(response);
};
export default { fetch: fetchItems };
