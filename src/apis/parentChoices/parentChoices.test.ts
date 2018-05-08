import parentChoicesAPI from './parentChoices';
import parentChoicesTestData from './parentChoices.testdata.json';

describe('parentChoices api', () => {
  it('fetch success', async () => {
    expect.assertions(1);
    const response = await parentChoicesAPI.fetch();
    expect(response).toEqual(parentChoicesTestData);
  });
});
