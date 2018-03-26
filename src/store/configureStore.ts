import { createStore, Store } from 'redux';
import reducers from './reducers';

const enhancer = (<any>window).devToolsExtension ?
  (<any>window).devToolsExtension() :
  (f: any) => f;
export default function () {
  return createStore(reducers, enhancer);
}
