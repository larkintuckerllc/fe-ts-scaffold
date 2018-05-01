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
interface FetchItemsParams {
  limit?: number;
  offset?: number;
}
const fetchItems = (params?: FetchItemsParams) => {
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
