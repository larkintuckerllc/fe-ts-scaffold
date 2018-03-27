import { createStore } from 'redux';
import reducers from './reducers';

const enhancer = (<any>window).devToolsExtension ?
  /* istanbul ignore next */
  (<any>window).devToolsExtension() :
  (f: any) => f;
export default function () {
  return createStore(reducers, enhancer);
}
