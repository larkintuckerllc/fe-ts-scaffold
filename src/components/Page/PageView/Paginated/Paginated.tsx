import * as fromItems from 'DUCKS/items';
import Item from 'DUCKS/items/Item';
import { List } from 'immutable';
import { connect } from 'react-redux';
import AppState from 'STORE/AppState';
import PaginatedView from './PaginatedView';

interface StateProps {
  error: boolean;
  requested: boolean;
  items: List<Item>;
}

interface DispatchProps {
  fetchItems(): void;
}

const mapStateToProps = (state: AppState) => ({
  error: fromItems.getItemsError(state),
  items: fromItems.getItemsPaged(state),
  requested: fromItems.getItemsRequested(state),
});

const mapDispatchToProps = {
  fetchItems: fromItems.fetchItems,
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(
  PaginatedView
);
