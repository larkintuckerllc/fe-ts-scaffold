import { combineReducers } from 'redux-immutable';
import { fromJS, List, Record } from 'immutable';
import { AppAction } from 'STORE/reducers';
import * as fromTodos from 'APIS/todos';

// TODO
const todoDefault = {
  completed: false,
  id: 0,
  title: 'title',
  userID: 0,
};
interface todoStateParams {
  completed: boolean;
  id: number;
  title: string;
  userID: number;
}
export class todoState extends Record(todoDefault) {
  constructor(params: todoStateParams) {
    super(params);
  }
  get<T extends keyof todoStateParams>(value: T): todoStateParams[T] { 
    return super.get(value);
  }
}
// ACTIONS
const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
const FETCH_TODOS_RESPONSE = 'FETCH_TODOS_RESPONSE';
/*
interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userID: number;
}
*/
export interface FetchTodosRequestAction {
  type: 'FETCH_TODOS_REQUEST';
}
export interface FetchTodosResponseAction {
  type: 'FETCH_TODOS_RESPONSE';
  payload: List<Map<string, any>>;
}
const fetchTodosRequest = (): FetchTodosRequestAction => ({
  type: FETCH_TODOS_REQUEST,
});
const fetchTodosResponse = (payload: List<Map<string,any>>): FetchTodosResponseAction => ({
  payload,
  type: FETCH_TODOS_RESPONSE,
});
export const fetchTodos = () => (dispatch: (action: AppAction) => void) => {
  dispatch(fetchTodosRequest());
  fromTodos.fetchTodos()
    .then(json => dispatch(fetchTodosResponse(fromJS(json))));
    // TODO: ERROR
};
// STATE
const todosDefault = {
  ids: List<number>([]),
  received: false,
};
interface todosStateParams {
  ids: List<number>;
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
/*
const byId = (state: Map<string, Todo> , action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_RESPONSE: {
      const entry = {}; // INTERNALLY NOT USING IMMUTABLE.JS
      for (let i = 0; i < action.payload.size; i += 1) {
        const item = action.payload.get(i);
        entry[item.get('id')] = item;
      }
      return state.merge(entry);
    }
    default:
      return state;
  }
};
*/
const ids = (state: List<number>, action: AppAction) => {
  switch (action.type) {
    case FETCH_TODOS_RESPONSE:
      return List(action.payload.map((o: Map<string,any>) => o.get('id')));
    default:
      return state;
  }
};
export default combineReducers({
  ids,
  received,
});
// SELECTORS
// TODO: SELECTORS
