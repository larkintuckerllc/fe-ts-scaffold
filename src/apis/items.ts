import Ajv from 'ajv';

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
const SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Item set',
  items: {
    description: 'Item',
    properties: {
      id: {
        description: 'The unique identifier',
        type: 'integer',
      },
      name: {
        description: 'The name',
        type: 'string',
      },
    },
    required: ['id', 'name'],
    title: 'Item',
    type: 'object',
  },
  title: 'Item set',
  type: 'array',
};
const ajv = new Ajv();
const validate = ajv.compile(SCHEMA);
interface FetchItemsParams {
  limit?: number;
  offset?: number;
}
export const fetchItems = (params?: FetchItemsParams) => {
  const valid = validate(ITEMS);
  if (!valid) {
    return Promise.reject('500');
  }
  let response = {
    count: ITEMS.length,
    results: ITEMS,
  };
  if (params === undefined) {
    return Promise.resolve(response);
  }
  const limit = params.limit;
  if (limit === undefined) {
    return Promise.resolve(response);
  }
  const offset = params.offset !== undefined ? params.offset : 0;
  const items = ITEMS.slice(offset, offset + limit);
  response = {
    count: items.length,
    results: items,
  };
  return Promise.resolve(response);
};
