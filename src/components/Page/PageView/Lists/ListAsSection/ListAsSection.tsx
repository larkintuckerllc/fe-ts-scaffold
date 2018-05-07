import * as fromList from 'DUCKS/list';
import { ListItemRecord } from 'DUCKS/list/ListItem';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { AppStateRecord } from 'STORE/AppState';
import ListAsView from './ListAsView';

interface StateProps {
  error: boolean;
  list: List<ListItemRecord>;
  requested: boolean;
}

interface DispatchProps {
  fetchList(): void;
}

const mapStateToProps = (state: AppStateRecord) => ({
  error: fromList.getListError(state),
  list: fromList.getList(state),
  requested: fromList.getListRequested(state),
});

const mapDispatchToProps = {
  fetchList: fromList.fetchList,
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ListAsView);
