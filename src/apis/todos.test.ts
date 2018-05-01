import todosAPI from './todos';

describe('todos api', () => {
  it('fetchTodos success with fetch success', async () => {
    const todos = [
      {
        completed: false,
        id: 0,
        title: 'title',
        userId: 0,
      },
    ];
    const json = jest.fn().mockImplementation(() => Promise.resolve(todos));
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json,
      })
    );
    expect.assertions(1);
    const response = await todosAPI.fetch();
    expect(response).toBe(todos);
  });

  it('fetchTodos error with fetch error', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject(true));
    expect.assertions(1);
    try {
      await todosAPI.fetch();
    } catch (e) {
      expect(true).toEqual(true); // JUST EXPECT CATCH TO BE CALLED
    }
  });

  it('fetchTodos error with fetch success but not json', async () => {
    const json = jest.fn().mockImplementation(() => Promise.reject(true));
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json,
      })
    );
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
    const json = jest.fn().mockImplementation(() => Promise.resolve(todos));
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json,
      })
    );
    expect.assertions(1);
    try {
      await todosAPI.fetch();
    } catch (e) {
      expect(true).toEqual(true);
    }
  });
});
