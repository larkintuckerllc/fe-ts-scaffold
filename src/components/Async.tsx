/* tslint:disable-next-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fromTodos from 'DUCKS/todos';

interface StateProps {
}
interface DispatchProps {
  fetchTodos(): void;
}
interface ConnectedProps extends StateProps, DispatchProps {
}
export class Connected extends Component<ConnectedProps> {
  componentDidMount() {
    const { fetchTodos } = this.props;
    fetchTodos();
  }
  render() {
    return (
      <div>
        <h2>Async</h2>
      </div>
    );
  }
}
const mapStateToProps = () => {
  return ({
  });
};
const mapDispatchToProps = {
  fetchTodos: fromTodos.fetchTodos,
};
export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Connected);

