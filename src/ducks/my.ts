import { combineReducers } from 'redux-immutable';
import { Record } from 'immutable';

const myDefaults = {
  flag: false,
};
interface myStateParams {
  flag: boolean;
}
export class myState extends Record(myDefaults) {
  constructor(params: myStateParams) {
    super(params);
  }
  get<T extends keyof myStateParams>(value: T): myStateParams[T] { 
    return super.get(value);
  }
}
export const myInitialState = new myState(myDefaults);
const flag = (state: any) => {
  console.log(state);
  return state;
};
export default combineReducers({
  flag,
});
