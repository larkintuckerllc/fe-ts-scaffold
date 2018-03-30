import { combineReducers } from 'redux-immutable';
import { List, Record } from 'immutable';
import { AppAction } from 'STORE/reducers';

// ACTIONS
const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
const FETCH_TODOS_RESPONSE = 'FETCH_TODOS_RESPONSE';
interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userID: number;
}
export interface FetchTodosRequestAction {
  type: 'FETCH_TODOS_REQUEST';
}
export interface FetchTodosResponseAction {
  type: 'FETCH_TODOS_RESPONSE';
  payload: Todo[];
}
const fetchTodosRequest = (): FetchTodosRequestAction => ({
  type: FETCH_TODOS_REQUEST,
});
const fetchTodosResponse = (payload: Todo[]): FetchTodosResponseAction => ({
  payload,
  type: FETCH_TODOS_RESPONSE,
});
export const fetchTodos = () => (dispatch: (action: AppAction) => void) => {
  dispatch(fetchTodosRequest());
  dispatch(fetchTodosResponse([]));
};
// STATE
const todosDefault = {
  ids: List<Todo>([]),
  received: false,
};
interface todosStateParams {
  ids: List<Todo>;
  received: boolean;
}
export class todosState extends Record(todosDefault) {
  constructor(params: todosStateParams) {
    super(params);
  }
  get<T extends keyof todosStateParams>(value: T): todosStateParams[T] { 
    return super.get(value);
  }
}
// STATE
export const todosInitialState = new todosState(todosDefault);
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
const ids = (state: List<number>, action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_RESPONSE:
      return List(action.payload.map((o: Todo) => o.id));
    default:
      return state;
  }
};
export default combineReducers({
  ids,
  received,
});
// SELECTORS
