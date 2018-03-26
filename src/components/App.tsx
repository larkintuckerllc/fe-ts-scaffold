/* tslint:disable-next-line */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as fromAdder from 'Ducks/adder';
import * as fromCounter from 'Ducks/counter';
import { State } from 'Store/reducers';

interface AppProps {
  add(value: string): void;
  adder: string[];
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
       <ul>
         {adder.map(o => <li>{o}</li>)}
        </ul>
       <button onClick={() => add('Test')}>Add</button>
     </div>
  );
}
function mapStateToProps(state: State) {
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
