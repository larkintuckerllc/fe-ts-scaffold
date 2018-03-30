import { combineReducers } from 'redux-immutable';
import { List, Map, Record } from 'immutable';
import { AppAction, AppState } from 'STORE/reducers';
import * as fromTodos from 'APIS/todos';

// TODO
const todoDefault = {
  completed: false,
  id: 0,
  title: 'title',
  userID: 0,
};
interface TodoStateParams {
  completed: boolean;
  id: number;
  title: string;
  userID: number;
}
export class TodoState extends Record(todoDefault) {
  constructor(params: TodoStateParams) {
    super(params);
  }
  get<T extends keyof TodoStateParams>(value: T): TodoStateParams[T] { 
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
  payload: List<TodoState>;
}
const fetchTodosRequest = (): FetchTodosRequestAction => ({
  type: FETCH_TODOS_REQUEST,
});
const fetchTodosResponse = (payload: List<TodoState>): FetchTodosResponseAction => ({
  payload,
  type: FETCH_TODOS_RESPONSE,
});
export const fetchTodos = () => (dispatch: (action: AppAction) => void) => {
  dispatch(fetchTodosRequest());
  fromTodos.fetchTodos()
    .then((json) => {
      const reducer =
        (
          accumulator: List<TodoState>,
          jsonTodo: TodoStateParams,
        ) => accumulator.push(new TodoState(jsonTodo));
      const todos = json.reduce(reducer, List<TodoState>([]));
      dispatch(fetchTodosResponse(todos));
    });
    // TODO: ERROR
};
// STATE
const todosDefault = {
  byId: Map<number, TodoState>({}),
  ids: List<number>([]),
  received: false,
};
interface TodosStateParams {
  byId: Map<number, TodoState>;
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
const byId = (state: Map<number, TodoState> , action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_RESPONSE:
      const reducer = (
        accumulator: Map<number, TodoState>,
        todo: TodoState,
      ) => accumulator.set(todo.get('id'), todo);
      return action.payload.reduce(reducer, state);
    default:
      return state;
  }
};
const ids = (state: List<number>, action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_RESPONSE:
      return List(action.payload.map((o: TodoState) => o.get('id')));
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
// TODO: GETTODOS
// TODO: RESELECT
// TODO: GETIN
// TODO: TEST GETTODO
export const getTodo = (state: AppState, id: number) => {
  return state.get('todos').get('byId').get(id);
};
export const getTodos = (state: AppState) => {
  const byId = state.get('todos').get('byId');
  const ids = state.get('todos').get('ids');
  const final = <List<TodoState>>ids.map(o => byId.get(o));
  return final;
};
