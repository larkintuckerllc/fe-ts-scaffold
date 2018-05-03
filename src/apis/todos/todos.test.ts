import todosAPI from './todos';
import todosTestData from './todos.testdata';

describe('todos api', () => {
  it('fetchTodos success with fetch success', async () => {
    const json = jest.fn().mockResolvedValue(todosTestData);
    window.fetch = jest.fn().mockResolvedValue({ json });
    expect.assertions(1);
    const response = await todosAPI.fetch();
    expect(response).toBe(todosTestData);
  });

  it('fetchTodos error with fetch error', async () => {
    window.fetch = jest.fn().mockRejectedValue(true);
    expect.assertions(1);
    try {
      await todosAPI.fetch();
    } catch (e) {
      expect(true).toEqual(true); // JUST EXPECT CATCH TO BE CALLED
    }
  });

  it('fetchTodos error with fetch success but not json', async () => {
    const json = jest.fn().mockRejectedValue(true);
    window.fetch = jest.fn().mockResolvedValue({ json });
    expect.assertions(1);
    try {
      await todosAPI.fetch();
    } catch (e) {
      expect(true).toEqual(true);
    }
  });

  it('fetchTodos error with fetch success with json but invalid', async () => {
    const todos = [
      {
        bogus: true,
      },
    ];
    const json = jest.fn().mockResolvedValue(todos);
    window.fetch = jest.fn().mockResolvedValue({ json });
    expect.assertions(1);
    try {
      await todosAPI.fetch();
    } catch (e) {
      expect(true).toEqual(true);
    }
  });
});
