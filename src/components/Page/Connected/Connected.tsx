/* tslint:disable-next-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fromCounter from 'DUCKS/counter';
import { AppState } from 'STORE/reducers';

interface StateProps {
  counter: number;
}
interface DispatchProps {
  decrement(): void;
  increment(): void;
}
interface ConnectedProps extends StateProps, DispatchProps {
}
export class Connected extends Component<ConnectedProps> {
  render() {
    const { counter, decrement, increment } = this.props;
    return (
      <div>
        <h2>Connected</h2>
        <div>{counter.toString()}</div>
        <button id="test_increment" onClick={increment}>+</button>
        <button id="test_decrement" onClick={decrement}>-</button>
      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => {
  return ({
    counter: fromCounter.getCounter(state),
  });
};
const mapDispatchToProps = {
  decrement: fromCounter.decrement,
  increment: fromCounter.increment,
};
export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Connected);
