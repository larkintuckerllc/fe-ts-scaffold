import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers, { initialState } from './reducers';

const middlewares = [
  reduxThunk,
];
const enhancer = compose(
  applyMiddleware(...middlewares),
  /* istanbul ignore next */
  (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f,
);
export default () => {
  return createStore(reducers, initialState, enhancer);
};
