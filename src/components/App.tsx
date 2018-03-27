import { List } from 'immutable';
/* tslint:disable-next-line */
import React from 'react';
import { connect } from 'react-redux';
import * as fromAdder from 'DUCKS/adder';
import * as fromCounter from 'DUCKS/counter';
import { AppState } from 'STORE/reducers';
import Counter from './Counter';
import Listing from './Listing';
import Media from './Media';
import Styling from './Styling';

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
       <Counter
         counter={counter}
         decrement={decrement}
         increment={increment}
       />
       <Listing
         add={add}
         items={adder.toJS()}
        />
        <Media />
        <Styling />
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
