import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers, { initialState } from './reducers';

const middlewares = [
  reduxThunk,
];
const enhancer = compose(
  applyMiddleware(...middlewares),
  /* istanbul ignore next */
  (<any>window).devToolsExtension ? (<any>window).devToolsExtension() : (f: any) => f,
);
export default () => {
  return createStore(reducers, initialState, enhancer);
}
