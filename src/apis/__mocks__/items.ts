const ITEMS = [
  {
    id: 0,
    name: 'name',
  },
];
interface FetchItemsParams {
  limit?: number;
  offset?: number;
}
let error = false;

export const setError = (value: boolean): void => {
  error = value;
};

const fetchItems = (params?: FetchItemsParams) => {
  if (error) {
    return Promise.reject('500');
  }
  let items;
  let response;
  if (params === undefined) {
    response = {
      count: ITEMS.length,
      results: ITEMS,
    };
    return Promise.resolve(response);
  }
  const limit = params.limit;
  const offset = params.offset !== undefined ? params.offset : 0;
  if (limit === undefined) {
    items = ITEMS.slice(offset);
    response = {
      count: ITEMS.length,
      results: items,
    };
    return Promise.resolve(response);
  }
  items = ITEMS.slice(offset, offset + limit);
  response = {
    count: ITEMS.length,
    results: items,
  };
  return Promise.resolve(response);
};
export default { fetch: fetchItems };
