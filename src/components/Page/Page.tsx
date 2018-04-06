import * as fromAdder from 'DUCKS/adder';
import * as fromCounter from 'DUCKS/counter';
import { List } from 'immutable';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'STORE/reducers';
import AnotherCounter from './AnotherCounter';
import Ant from './Ant';
// import Async from './Async';
import Counter from './Counter';
import Frame from './Frame';
import Listing from './Listing';
import Media from './Media';
import Stateful from './Stateful';
import Styling from './Styling';
// import Wrapped from './Wrapped';

interface StateProps {
  adder: List<string>;
  counter: number;
}
interface DispatchProps {
  add(value: string): void;
  decrement(): void;
  increment(): void;
}
interface PageProps extends StateProps, DispatchProps {
}
/* tslint:disable-next-line */
export const Page =  ({
  add,
  adder,
  counter,
  decrement,
  increment,
}: PageProps) => {
  return (
     <Frame>
       <Ant />
       <AnotherCounter />
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
       <Stateful />
       <Styling />
     </Frame>
  );
};
const mapStateToProps = (state: AppState) => {
  return ({
    adder: fromAdder.getAdder(state),
    counter: fromCounter.getCounter(state),
  });
};
const mapDispatchToProps = {
  add: fromAdder.add,
  decrement: fromCounter.decrement,
  increment: fromCounter.increment,
};
export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
