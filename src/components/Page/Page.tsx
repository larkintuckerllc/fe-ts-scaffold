import * as fromAdder from 'DUCKS/adder';
import * as fromCounter from 'DUCKS/counter';
import * as fromInfinite from 'DUCKS/infinite';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { AppStateRecord } from 'STORE/AppState';
import PageView from './PageView';

interface StateProps {
  adder: List<string>;
  counter: number;
  infinite: boolean;
}

interface DispatchProps {
  add(value: string): void;
  decrement(): void;
  increment(): void;
  toggleInfinite(): void;
}

const mapStateToProps = (state: AppStateRecord) => ({
  adder: fromAdder.getAdder(state),
  counter: fromCounter.getCounter(state),
  infinite: fromInfinite.getInfinite(state),
});

const mapDispatchToProps = {
  add: fromAdder.add,
  decrement: fromCounter.decrement,
  increment: fromCounter.increment,
  toggleInfinite: fromInfinite.toggleInfinite,
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(PageView);
