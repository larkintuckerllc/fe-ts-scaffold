/* tslint:disable-next-line */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';
import * as fromAdder from 'Ducks/adder';
import * as fromCounter from 'Ducks/counter';
import { AppState } from 'Store/reducers';
import AppCounter from './AppCounter';
import AppList from './AppList';

interface AppProps {
  add(value: string): void;
  adder: List<string>;
  counter: number;
  decrement(): void;
  increment(): void;
}
/* tslint:disable-next-line */
function App({
  add,
  adder,
  counter,
  decrement,
  increment,
}: AppProps) {
  return (
     <div>
       <AppCounter
         counter={counter}
         decrement={decrement}
         increment={increment}
       />
       <AppList
         add={add}
         items={adder.toJS()}
        />
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
)(App);
