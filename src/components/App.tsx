/* tslint:disable-next-line */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';
import * as fromAdder from 'Ducks/adder';
import * as fromCounter from 'Ducks/counter';
import { AppState } from 'Store/reducers';
import AppList from './AppList';

interface AppProps {
  add(value: string): void;
  adder: List<string>;
  counter: number;
  decrement(): void;
  increment(): void;
}
export function app({
  add,
  adder,
  counter,
  decrement,
  increment,
}: AppProps) {
  return (
     <div>
       <div>Hello World</div>
       <div>{counter}</div>
       <button onClick={increment}>+</button>
       <button onClick={decrement}>-</button>
       <div>
         <button onClick={() => add('Test')}>Add</button>
       </div>
       <AppList items={adder}/>
     </div>
  );
}
function mapStateToProps(state: AppState) {
  return ({
    adder: fromAdder.getAdder(state),
    counter: fromCounter.getCounter(state),
  });
}
const mapDispatchToProps = {
  add: fromAdder.add,
  decrement: fromCounter.decrement,
  increment: fromCounter.increment,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(app);
