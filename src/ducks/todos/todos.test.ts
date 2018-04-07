// import { List, Map } from 'immutable';
// import { init, initialState } from 'STORE/reducers';
// import Todo from './Todo';
/*
import todos, {
  fetchTodos,
  getTodo,
  getTodos,
  getTodosError,
  getTodosRequested,
} from './todos';
*/
import { List, Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { appStateInitial } from 'STORE/AppState';
import Todo from './Todo';
import {
  fetchTodos,
  getTodo,
  getTodos,
  getTodosError,
  getTodosRequested,
} from './todos';
import { todosInitialState } from './TodosState';

jest.mock('APIS/todos');

describe('todos duck', () => {
  const todoDefault = {
    completed: false,
    id: 0,
    title: 'title',
    userID: 0,
  };
  const todoSample = new Todo(todoDefault);
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
  let byIdSample = Map<number, Todo>({});
  byIdSample = byIdSample.set(todoSample.get('id'), todoSample);
  const idsSample = List([todoSample.get('id')]);
  let todosStateSample = todosInitialState.set('byId', byIdSample);
  todosStateSample = todosStateSample.set('ids', idsSample);
  const appStateSample = appStateInitial.set('todos', todosStateSample);

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

  /*
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
  describe('errored reducer', () => {
    it('should ignore unknown actions', () => {
      expect(errored(false, init())).toBe(false);
    });
    it('should handle FETCH_TODOS_REQUEST', () => {
      expect(errored(true, fetchTodosRequest())).toBe(false);
    });
    it('should handle FETCH_TODOS_RESPONSE success', () => {
      expect(errored(false, fetchTodosResponse(List<Todo>([])))).toBe(false);
    });
    it('should handle FETCH_TODOS_RESPONSE error', () => {
      expect(errored(false, fetchTodosResponse('500', true))).toBe(true);
    });
  });
  */

  // SELECTORS
  it('getTodosRequested should return', () => {
    const result = false;
    expect(getTodosRequested(appStateInitial)).toEqual(result);
  });

  it('getTodosError should return', () => {
    const result = false;
    expect(getTodosError(appStateInitial)).toEqual(result);
  });
  it('getTodo should return', () => {
    const id = todoSample.get('id');
    expect(getTodo(appStateSample, id)).toEqualImmutable(todoSample);
  });

  it('getTodos should return', () => {
    const result = List([todoSample]);
    expect(getTodos(appStateSample)).toEqualImmutable(result);
  });

});
