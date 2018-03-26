/* tslint:disable-next-line */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as fromCounter from 'Ducks/counter';
import { State } from 'Store/reducers';

interface AppProps {
  counter: number;
  decrement(): void;
  increment(): void;
}
export function app({ counter, decrement, increment }: AppProps) {
  return (
     <div>
       <div>Hello World</div>
       <div>{counter}</div>
       <button onClick={increment}>+</button>
       <button onClick={decrement}>-</button>
     </div>
  );
}
function mapStateToProps(state: State) {
  return ({
    counter: fromCounter.getCounter(state),
  });
}
const mapDispatchToProps = {
  decrement: fromCounter.decrement,
  increment: fromCounter.increment,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(app);
