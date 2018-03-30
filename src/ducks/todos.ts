import { List, Map, Record } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';
import { AppAction, AppState } from 'STORE/reducers';
import * as fromTodos from 'APIS/todos';

// TODO
const todoDefault = {
  completed: false,
  id: 0,
  title: 'title',
  userID: 0,
};
export interface TodoJS {
  completed: boolean;
  id: number;
  title: string;
  userID: number;
}
export class Todo extends Record(todoDefault) {
  constructor(params: TodoJS) {
    super(params);
  }
  get<T extends keyof TodoJS>(value: T): TodoJS[T] { 
    return super.get(value);
  }
}
// ACTIONS
const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
const FETCH_TODOS_RESPONSE = 'FETCH_TODOS_RESPONSE';
export interface FetchTodosRequestAction {
  type: 'FETCH_TODOS_REQUEST';
}
export interface FetchTodosResponseAction {
  type: 'FETCH_TODOS_RESPONSE';
  payload: List<Todo> | string;
  error?: boolean;
}
const fetchTodosRequest = (): FetchTodosRequestAction => ({
  type: FETCH_TODOS_REQUEST,
});
const fetchTodosResponse =
  (payload: List<Todo> | string, error?: boolean): FetchTodosResponseAction => 
  error ?
    ({
      payload,
      type: FETCH_TODOS_RESPONSE,
      error: true,
    }) :
    ({
      payload,
      type: FETCH_TODOS_RESPONSE,
    });
export const fetchTodos = () => async (dispatch: (action: AppAction) => void) => {
  dispatch(fetchTodosRequest());
  try {
    const json = await fromTodos.fetchTodos();
    const reducer =
      (
        accumulator: List<Todo>,
        jsonTodo: TodoJS,
      ) => accumulator.push(new Todo(jsonTodo));
    const todos = json.reduce(reducer, List<Todo>([]));
    dispatch(fetchTodosResponse(todos));
  } catch {
    dispatch(fetchTodosResponse('500', true));
  }
};
// STATE
const todosDefault = {
  byId: Map<number, Todo>({}),
  error: false,
  ids: List<number>([]),
  received: false,
};
interface TodosStateJS {
  byId: Map<number, Todo>;
  error: boolean;
  ids: List<number>;
  received: boolean;
}
export class TodosState extends Record(todosDefault) {
  constructor(params: TodosStateJS) {
    super(params);
  }
  get<T extends keyof TodosStateJS>(value: T): TodosStateJS[T] { 
    return super.get(value);
  }
}
export const todosInitialState = new TodosState(todosDefault);
// REDUCER
const received = (state: boolean, action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return true;
    case FETCH_TODOS_RESPONSE:
      return false;
    default:
      return state;
  }
};
const byId = (state: Map<number, Todo> , action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_RESPONSE:
      if (action.error) return state;
      const reducer = (
        accumulator: Map<number, Todo>,
        todo: Todo,
      ) => accumulator.set(todo.get('id'), todo);
      const payload = <List<Todo>>action.payload;
      return payload.reduce(reducer, state);
    default:
      return state;
  }
};
const ids = (state: List<number>, action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_RESPONSE:
      if (action.error) return state;
      const payload = <List<Todo>>action.payload;
      return List(payload.map((o: Todo) => o.get('id')));
    default:
      return state;
  }
};
const error = (state: boolean, action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return false;
    case FETCH_TODOS_RESPONSE:
      return (action.error ? true : false);
    default:
      return state;
  }
};
export default combineReducers({
  byId,
  error,
  ids,
  received,
});
// SELECTORS
export const getTodo = (state: AppState, id: number) => {
  return state.get('todos').get('byId').get(id);
};
const getTodosById = (state: AppState) => state.get('todos').get('byId');
const getTodosIds = (state: AppState) => state.get('todos').get('ids');
export const getTodos = createSelector(
  [getTodosById, getTodosIds],
  (byId, ids) => <List<Todo>>ids.map(o => byId.get(o)),
);
