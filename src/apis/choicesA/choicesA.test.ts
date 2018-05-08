import choicesAAPI from './choicesA';
import choicesATestData from './choicesA.testdata.json';

describe('items api', () => {
  it('fetch success', async () => {
    expect.assertions(1);
    const response = await choicesAAPI.fetch();
    expect(response).toEqual(choicesATestData);
  });
});
