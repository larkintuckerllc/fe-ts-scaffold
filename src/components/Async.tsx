/* tslint:disable-next-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fromIds from 'DUCKS/ids';

interface StateProps {
}
interface DispatchProps {
  fetchTodos(): void;
}
interface AsyncProps extends StateProps, DispatchProps {
}
/* tslint:disable-next-line */
export class Async extends Component<AsyncProps> {
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
function mapStateToProps() {
  return ({
  });
}
const mapDispatchToProps = {
  fetchTodos: fromIds.fetchTodos,
};
export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Async);
