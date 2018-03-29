import { List } from 'immutable';
/* tslint:disable-next-line */
import React from 'react';
import { connect } from 'react-redux';
import * as fromAdder from 'DUCKS/adder';
import * as fromCounter from 'DUCKS/counter';
import { AppState } from 'STORE/reducers';
import Ant from './Ant';
import Connected from './Connected';
import Counter from './Counter';
import Frame from './Frame';
import Listing from './Listing';
import Media from './Media';
import Styling from './Styling';

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
export function Page({
  add,
  adder,
  counter,
  decrement,
  increment,
}: PageProps) {
  return (
     <Frame>
       <Ant />
       <Connected />
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
     </Frame>
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
export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
