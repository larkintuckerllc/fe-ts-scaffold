import choicesBAPI from './choicesB';
import choicesBTestData from './choicesB.testdata.json';

describe('items api', () => {
  it('fetch success', async () => {
    expect.assertions(1);
    const response = await choicesBAPI.fetch();
    expect(response).toEqual(choicesBTestData);
  });
});
