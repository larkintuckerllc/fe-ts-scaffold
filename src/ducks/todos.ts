import { combineReducers } from 'redux-immutable';
import { Record } from 'immutable';

// STATE
const todosDefault = {
  flag: false,
};
interface todosStateParams {
  flag: boolean;
}
export class todosState extends Record(todosDefault) {
  constructor(params: todosStateParams) {
    super(params);
  }
  get<T extends keyof todosStateParams>(value: T): todosStateParams[T] { 
    return super.get(value);
  }
}
export const todosInitialState = new todosState(todosDefault);
const flag = (state: any) => {
  return state;
};
export default combineReducers({
  flag,
});
