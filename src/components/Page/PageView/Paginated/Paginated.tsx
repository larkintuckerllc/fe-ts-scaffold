import * as fromItems from 'DUCKS/items';
import Item from 'DUCKS/items/Item';
import { List } from 'immutable';
import { connect } from 'react-redux';
import AppState from 'STORE/AppState';
import PaginatedView from './PaginatedView';

interface StateProps {
  currentPage: number;
  error: boolean;
  lastPage: number;
  requested: boolean;
  items: List<Item>;
}

interface DispatchProps {
  fetchItems(page: number): void;
}

const mapStateToProps = (state: AppState) => ({
  currentPage: fromItems.getCurrentPage(state),
  error: fromItems.getItemsError(state),
  items: fromItems.getItemsPaged(state),
  lastPage: fromItems.getLastPage(state),
  requested: fromItems.getItemsRequested(state),
});

const mapDispatchToProps = {
  fetchItems: fromItems.fetchItems,
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(
  PaginatedView
);
