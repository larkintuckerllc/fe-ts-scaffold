import { List, Map } from 'immutable';
import { init, initialState } from 'STORE/reducers';
import todos, {
  byId,
  error,
  fetchTodos,
  fetchTodosRequest,
  fetchTodosResponse,
  getTodo,
  getTodos,
  getTodosError,
  getTodosRequested,
  ids,
  requested,
  Todo,
  todoDefault,
  todosInitialState,
} from './todos';

jest.mock('APIS/todos');
describe('todos duck', () => {
  const sampleTodo = new Todo(todoDefault);
  const sampleTodos = List([sampleTodo]);
  let sampleById = Map<number, Todo>({});
  sampleById = sampleById.set(sampleTodo.get('id'), sampleTodo);
  const sampleIds = List([sampleTodo.get('id')]);
  let sampleTodosState = todosInitialState.set('byId', sampleById);
  sampleTodosState = sampleTodosState.set('ids', sampleIds);
  const sampleState = initialState.set('todos', sampleTodosState);
  // ACTIONS
  it('fetchTodosRequest should create FETCH_TODOS_REQUEST action', () => {
    expect(fetchTodosRequest()).toEqual({
      type: 'FETCH_TODOS_REQUEST',
    });
  });
  it('fetchTodosResponse success should create FETCH_TODOS_RESPONSE success action', () => {
    expect(fetchTodosResponse(sampleTodos)).toEqual({
      type: 'FETCH_TODOS_RESPONSE',
      payload: sampleTodos,
    });
  });
  it('fetchTodoResponse error should create FETCH_TODOS_RESPONSE error action', () => {
    const error = '500';
    expect(fetchTodosResponse(error, true)).toEqual({
      type: 'FETCH_TODOS_RESPONSE',
      payload: error,
      error: true,
    });
  });
  it('fetchTodos success should dispatch request and response - success actions', () => {
    const dispatch = jest.fn();
    const todos = require('APIS/todos');
    todos.setError(false);
    return fetchTodos()(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual(fetchTodosRequest());
      expect(dispatch.mock.calls[1][0]).toEqual(fetchTodosResponse(sampleTodos));
    });
  });
  it('fetchTodos success should dispatch request and response - error actions', () => {
    const todos = require('APIS/todos');
    todos.setError(true);
    const dispatch = jest.fn();
    return fetchTodos()(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual(fetchTodosRequest());
      expect(dispatch.mock.calls[1][0]).toEqual(fetchTodosResponse('500', true));
    });
  });
  // REDUCERS
  it('reducer should ignore unknown actions', () => {
    expect(todos(todosInitialState, init())).toBe(todosInitialState);
  });
  describe('requested reducer', () => {
    it('should ignore unknown actions', () => {
      expect(requested(false, init())).toBe(false);
    });
    it('should handle FETCH_TODOS_REQUEST', () => {
      expect(requested(false, fetchTodosRequest())).toBe(true);
    });
    it('should handle FETCH_TODOS_RESPONSE success', () => {
      expect(requested(true, fetchTodosResponse(List<Todo>([])))).toBe(false);
    });
    it('should handle FETCH_TODOS_RESPONSE error', () => {
      expect(requested(true, fetchTodosResponse('500', true))).toBe(false);
    });
  });
  describe('byId reducer', () => {
    const byIdInitialState = todosInitialState.get('byId');
    it('should ignore unknown actions', () => {
      expect(byId(byIdInitialState, init())).toBe(byIdInitialState);
    });
    it('should handle FETCH_TODOS_RESPONSE success', () => {
      expect(byId(byIdInitialState, fetchTodosResponse(sampleTodos))).toEqual(sampleById);
    });
    it('should handle FETCH_TODOS_RESPONSE error', () => {
      expect(byId(byIdInitialState, fetchTodosResponse('500', true))).toEqual(byIdInitialState);
    });
  });
  describe('ids reducer', () => {
    const idsInitialState = todosInitialState.get('ids');
    it('should ignore unknown actions', () => {
      expect(ids(idsInitialState, init())).toBe(idsInitialState);
    });
    it('should handle FETCH_TODOS_RESPONSE success', () => {
      expect(ids(idsInitialState, fetchTodosResponse(sampleTodos))).toEqual(sampleIds);
    });
    it('should handle FETCH_TODOS_RESPONSE error', () => {
      expect(ids(idsInitialState, fetchTodosResponse('500', true))).toEqual(idsInitialState);
    });
  });
  describe('error reducer', () => {
    it('should ignore unknown actions', () => {
      expect(error(false, init())).toBe(false);
    });
    it('should handle FETCH_TODOS_REQUEST', () => {
      expect(error(true, fetchTodosRequest())).toBe(false);
    });
    it('should handle FETCH_TODOS_RESPONSE success', () => {
      expect(error(false, fetchTodosResponse(List<Todo>([])))).toBe(false);
    });
    it('should handle FETCH_TODOS_RESPONSE error', () => {
      expect(error(false, fetchTodosResponse('500', true))).toBe(true);
    });
  });
  // SELECTORS
  it('getTodosRequested should return', () => {
    expect(getTodosRequested(initialState)).toEqual(false);
  });
  it('getTodosError should return', () => {
    expect(getTodosError(initialState)).toEqual(false);
  });
  it('getTodo should return', () => {
    expect(getTodo(sampleState, sampleTodo.get('id'))).toEqual(sampleTodo);
  });
  it('getTodos should return', () => {
    expect(getTodos(sampleState)).toEqual(List([sampleTodo]));
  });
});
