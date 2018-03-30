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
interface TodoParams {
  completed: boolean;
  id: number;
  title: string;
  userID: number;
}
export class Todo extends Record(todoDefault) {
  constructor(params: TodoParams) {
    super(params);
  }
  get<T extends keyof TodoParams>(value: T): TodoParams[T] { 
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
  payload: List<Todo>;
}
const fetchTodosRequest = (): FetchTodosRequestAction => ({
  type: FETCH_TODOS_REQUEST,
});
const fetchTodosResponse = (payload: List<Todo>): FetchTodosResponseAction => ({
  payload,
  type: FETCH_TODOS_RESPONSE,
});
// TODO: ASYNC AWAIT
export const fetchTodos = () => (dispatch: (action: AppAction) => void) => {
  dispatch(fetchTodosRequest());
  fromTodos.fetchTodos()
    .then((json) => {
      const reducer =
        (
          accumulator: List<Todo>,
          jsonTodo: TodoParams,
        ) => accumulator.push(new Todo(jsonTodo));
      const todos = json.reduce(reducer, List<Todo>([]));
      dispatch(fetchTodosResponse(todos));
    });
    // TODO: ERROR
};
// STATE
const todosDefault = {
  byId: Map<number, Todo>({}),
  ids: List<number>([]),
  received: false,
};
interface TodosStateParams {
  byId: Map<number, Todo>;
  ids: List<number>;
  received: boolean;
}
export class TodosState extends Record(todosDefault) {
  constructor(params: TodosStateParams) {
    super(params);
  }
  get<T extends keyof TodosStateParams>(value: T): TodosStateParams[T] { 
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
      const reducer = (
        accumulator: Map<number, Todo>,
        todo: Todo,
      ) => accumulator.set(todo.get('id'), todo);
      return action.payload.reduce(reducer, state);
    default:
      return state;
  }
};
const ids = (state: List<number>, action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_RESPONSE:
      return List(action.payload.map((o: Todo) => o.get('id')));
    default:
      return state;
  }
};
export default combineReducers({
  byId,
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
