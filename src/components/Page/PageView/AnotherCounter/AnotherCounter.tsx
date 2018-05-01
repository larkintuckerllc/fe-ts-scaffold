import * as fromCounter from 'DUCKS/counter';
import { Record } from 'immutable';
import { connect } from 'react-redux';
import AppState from 'STORE/AppState';
import AnotherCounterView from './AnotherCounterView';

interface StateProps {
  counter: number;
}

interface DispatchProps {
  decrement(): void;
  increment(): void;
}

const mapStateToProps = (state: Record<AppState>) => ({
  counter: fromCounter.getCounter(state),
});

const mapDispatchToProps = {
  decrement: fromCounter.decrement,
  increment: fromCounter.increment,
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(
  AnotherCounterView
);
