import * as fromTodos from 'APIS/todos';
import { List, Map, Record } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';
import AppAction from 'STORE/AppAction';
import AppState from 'STORE/AppState';
import Todo, { TodoFactory, TodoRecord } from './Todo';

// ACTIONS
const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';

const FETCH_TODOS_RESPONSE = 'FETCH_TODOS_RESPONSE';

export interface FetchTodosRequestAction {
  type: typeof FETCH_TODOS_REQUEST;
}

export interface FetchTodosResponseAction {
  type: typeof FETCH_TODOS_RESPONSE;
  payload: List<TodoRecord> | string;
  error?: boolean;
}

const fetchTodosRequest = (): FetchTodosRequestAction => ({
  type: FETCH_TODOS_REQUEST,
});

const fetchTodosResponse = (
  payload: List<TodoRecord> | string,
  error?: boolean
): FetchTodosResponseAction =>
  error
    ? {
        error: true,
        payload,
        type: FETCH_TODOS_RESPONSE,
      }
    : {
        payload,
        type: FETCH_TODOS_RESPONSE,
      };

export const fetchTodos = () => async (dispatch: (action: AppAction) => void) => {
  dispatch(fetchTodosRequest());
  try {
    const json = await fromTodos.fetchTodos();
    const reducer = (accumulator: List<TodoRecord>, jsonTodo: Todo) =>
      accumulator.push(TodoFactory(jsonTodo));
    const todos = json.reduce(reducer, List<TodoRecord>([])) as List<TodoRecord>;
    dispatch(fetchTodosResponse(todos));
  } catch {
    dispatch(fetchTodosResponse('500', true));
  }
};

// REDUCER
const requested = (state: boolean, action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return true;
    case FETCH_TODOS_RESPONSE:
      return false;
    default:
      return state;
  }
};

const byId = (state: Map<number, TodoRecord>, action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_RESPONSE:
      if (action.error) {
        return state;
      }
      const reducer = (accumulator: Map<number, TodoRecord>, todo: TodoRecord) =>
        accumulator.set(todo.get('id', null), todo);
      const payload = action.payload as List<TodoRecord>;
      return payload.reduce(reducer, state);
    default:
      return state;
  }
};

const ids = (state: List<number>, action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_RESPONSE:
      if (action.error) {
        return state;
      }
      const payload = action.payload as List<TodoRecord>;
      return List(payload.map((o: TodoRecord) => o.get('id', null)));
    default:
      return state;
  }
};

const errored = (state: boolean, action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return false;
    case FETCH_TODOS_RESPONSE:
      return action.error ? true : false;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  errored,
  ids,
  requested,
});

// SELECTORS
export const getTodosRequested = (state: Record<AppState>) =>
  state.get('todos', null).get('requested', null);

export const getTodosError = (state: Record<AppState>) =>
  state.get('todos', null).get('errored', null);

export const getTodo = (state: Record<AppState>, id: number) => {
  return state
    .get('todos', null)
    .get('byId', null)
    .get(id);
};

const getTodosById = (state: Record<AppState>) => state.get('todos', null).get('byId', null);

const getTodosIds = (state: Record<AppState>) => state.get('todos', null).get('ids', null);

export const getTodos = createSelector(
  [getTodosById, getTodosIds],
  (pById, pIds) => pIds.map(o => pById.get(o)) as List<TodoRecord>
);
