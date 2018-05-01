import { List, Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { unknown } from 'STORE/AppAction';
import { appStateRecordDefault } from 'STORE/AppState';
import { TodoFactory, TodoRecord } from './Todo';
import todos, { fetchTodos, getTodo, getTodos, getTodosError, getTodosRequested } from './todos';
import { todosStateRecordDefault } from './TodosState';

jest.mock('APIS/todos');

describe('todos duck', () => {
  const todoDefault = {
    completed: false,
    id: 0,
    title: 'title',
    userID: 0,
  };
  const todoSample = TodoFactory(todoDefault);
  const todosSample = List([todoSample]);
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
  let byIdSample = Map<number, TodoRecord>();
  byIdSample = byIdSample.set(todoSample.get('id', null), todoSample);
  const idsSample = List([todoSample.get('id', null)]);
  let todosStateSample = todosStateRecordDefault.set('byId', byIdSample);
  todosStateSample = todosStateSample.set('ids', idsSample);
  const appStateSample = appStateRecordDefault.set('todos', todosStateSample);

  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  // ACTIONS
  it('fetchTodos success should dispatch request and response - success actions', () => {
    const dispatch = jest.fn();
    const apisTodos = require('APIS/todos');
    apisTodos.setError(false);
    return fetchTodos()(dispatch).then(() => {
      const callsLength = 2;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(request);
      expect(dispatch.mock.calls[1][0]).toEqual(responseSuccess);
    });
  });

  it('fetchTodos success should dispatch request and response - error actions', () => {
    const dispatch = jest.fn();
    const apisTodos = require('APIS/todos');
    apisTodos.setError(true);
    return fetchTodos()(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual(request);
      expect(dispatch.mock.calls[1][0]).toEqual(responseError);
    });
  });

  // REDUCERS
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

  // SELECTORS
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
    const result = List([todoSample]);
    expect(getTodos(appStateSample)).toEqualImmutable(result);
  });
});
