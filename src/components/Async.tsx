/* tslint:disable-next-line */
import React from 'react';
import { connect } from 'react-redux';
import * as fromTodos from 'DUCKS/todos';

interface AppProps {
  fetchTodos(): void;
}
/* tslint:disable-next-line */
export function Page({
}: AppProps) {
  return (
    <div>Test</div>
  );
}
function mapStateToProps() {
  return ({
  });
}
const mapDispatchToProps = {
  fetchTodos: fromTodos.fetchTodos,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
// export default class Listing extends Component<ListingProps> {
