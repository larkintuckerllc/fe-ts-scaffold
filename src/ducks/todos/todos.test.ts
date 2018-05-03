import todosAPI from 'APIS/todos';
import todosTestData from 'APIS/todos/todos.testdata';
import { List, Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { unknown } from 'STORE/AppAction';
import { appStateRecordDefault } from 'STORE/AppState';
import Todo, { TodoFactory, TodoRecord } from './Todo';
import todos, { fetchTodos, getTodo, getTodos, getTodosError, getTodosRequested } from './todos';
import { todosStateRecordDefault } from './TodosState';

describe('todos duck', () => {
  const todoSample = TodoFactory(todosTestData[0]);
  const reducer = (accumulator: List<TodoRecord>, jsonTodo: Todo) =>
    accumulator.push(TodoFactory(jsonTodo));
  const todosSample = todosTestData.reduce(reducer, List<TodoRecord>([])) as List<TodoRecord>;
  const request = {
    type: 'FETCH_TODOS_REQUEST',
  };
  const responseSuccess = {
    payload: todosSample,
    type: 'FETCH_TODOS_RESPONSE',
  };
  const responseError = {
    error: true,
    payload: '500',
    type: 'FETCH_TODOS_RESPONSE',
  };
  const reducerById = (accumulator: Map<number, TodoRecord>, todo: TodoRecord) =>
    accumulator.set(todo.get('id', null), todo);
  const byIdSample = todosSample.reduce(reducerById, Map<number, TodoRecord>());
  const idsSample = List([0, 1]);
  const todosStateSample = todosStateRecordDefault.set('byId', byIdSample).set('ids', idsSample);
  const appStateSample = appStateRecordDefault.set('todos', todosStateSample);

  beforeEach(() => {
    jest.addMatchers(matchers);
    jest.resetModules();
    jest.resetAllMocks();
  });

  // ACTIONS
  it('fetchTodos success should dispatch request and response - success actions', () => {
    todosAPI.fetch = jest.fn().mockResolvedValue(todosTestData);
    const dispatch = jest.fn();
    return fetchTodos()(dispatch).then(() => {
      const callsLength = 2;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(request);
      expect(dispatch.mock.calls[1][0]).toEqual(responseSuccess);
    });
  });

  it('fetchTodos success should dispatch request and response - error actions', () => {
    todosAPI.fetch = jest.fn().mockRejectedValue(new Error('500'));
    const dispatch = jest.fn();
    return fetchTodos()(dispatch).then(() => {
      const callsLength = 2;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(request);
      expect(dispatch.mock.calls[1][0]).toEqual(responseError);
    });
  });

  describe('reducer', () => {
    it('should ignore unknown actions', () => {
      const action = unknown();
      expect(todos(todosStateRecordDefault, action)).toBe(todosStateRecordDefault);
    });

    it('should handle FETCH_TODOS_REQUEST', () => {
      const result = todosStateRecordDefault.set('requested', true);
      expect(todos(todosStateRecordDefault, request)).toEqualImmutable(result);
    });

    it('should handle FETCH_TODOS_RESPONSE success', () => {
      const state = todosStateRecordDefault.set('requested', true);
      expect(todos(state, responseSuccess)).toEqualImmutable(todosStateSample);
    });

    it('should handle FETCH_TODOS_RESPONSE error', () => {
      const state = todosStateRecordDefault.set('requested', true);
      const nextState = todosStateRecordDefault.set('errored', true);
      expect(todos(state, responseError)).toEqualImmutable(nextState);
    });
  });

  describe('selectors', () => {
    it('getTodosRequested should return', () => {
      const result = false;
      expect(getTodosRequested(appStateRecordDefault)).toEqual(result);
    });

    it('getTodosError should return', () => {
      const result = false;
      expect(getTodosError(appStateRecordDefault)).toEqual(result);
    });

    it('getTodo should return', () => {
      const id = todoSample.get('id', null);
      expect(getTodo(appStateSample, id)).toEqualImmutable(todoSample);
    });

    it('getTodos should return', () => {
      const result = todosSample;
      expect(getTodos(appStateSample)).toEqualImmutable(result);
    });
  });
});
