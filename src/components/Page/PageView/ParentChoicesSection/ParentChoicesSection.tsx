import * as fromParentChoices from 'DUCKS/parentChoices';
import { ParentChoiceRecord } from 'DUCKS/parentChoices/ParentChoice';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { AppStateRecord } from 'STORE/AppState';
import ParentChoicesSectionView from './ParentChoicesSectionView';

interface StateProps {
  choices: List<ParentChoiceRecord>;
  error: boolean;
  requested: boolean;
}

interface DispatchProps {
  fetchParentChoices(): void;
}

const mapStateToProps = (state: AppStateRecord) => ({
  choices: fromParentChoices.getParentChoices(state),
  error: fromParentChoices.getParentChoicesError(state),
  requested: fromParentChoices.getParentChoicesRequested(state),
});

const mapDispatchToProps = {
  fetchParentChoices: fromParentChoices.fetchParentChoices,
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(
  ParentChoicesSectionView
);
